import { applyEnvConfig } from '@ljobse/appsettings-loader';
import { FlushMode } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import fs from 'fs';
import path from 'path';

import appsettings from './config.json';

process.env.TZ = 'UTC';

process.env.TZ = 'UTC';
const appsettingsPath = 'config.json';

let env = applyEnvConfig(appsettings);

const envPath = `${appsettingsPath.slice(0, -5)}.${process.env.NODE_ENV?.toLowerCase()}.json`;

const srcEnvPath = path.join(process.cwd(), 'src', envPath);
if (fs.existsSync(srcEnvPath)) {
  env = { ...env, ...applyEnvConfig(require(srcEnvPath)) };
}

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

const config: MikroOrmModuleSyncOptions = {
  allowGlobalContext: true,
  flushMode: FlushMode.COMMIT,
  migrations: {
    path: path.join(__dirname, 'migrations'),
    tableName: 'migrations',
    transactional: true,
    disableForeignKeys: false,
    emit: 'js',
  },
  type: 'postgresql',
  tsNode: false,
  entities: [path.join(process.cwd(), '**', '*.entity.js')],
  entitiesTs: [path.join(process.cwd(), '**', '*.entity.ts')],
  autoLoadEntities: true,
  ...(env.databaseUrl
    ? {
        clientUrl: env.databaseUrl,
      }
    : {
        user: env.postgresUser,
        password: env.postgresPassword,
        dbName: env.postgresDb,
        host: env.postgresInstance ? `${dbSocketPath}/${env.postgresInstance}` : env.postgresHost,
        port: env.postgresInstance ? null : env.postgresPort,
        ssl: env.postgresSslMode,
      }),
};

export default config;
