import { applyEnvConfig } from '@ljobse/appsettings-loader';
import fs from 'fs';
import path from 'path';

import appsettings from './config.json';

const appsettingsPath = 'config.json';

let config = applyEnvConfig(appsettings);

const envPath = `${appsettingsPath.slice(0, -5)}.${process.env.NODE_ENV?.toLowerCase()}.json`;

const srcEnvPath = path.join(process.cwd(), 'src', envPath);
if (fs.existsSync(srcEnvPath)) {
  config = { ...config, ...applyEnvConfig(require(srcEnvPath)) };
}

export { config };
