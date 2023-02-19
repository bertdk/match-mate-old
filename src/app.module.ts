import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TournamentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
  ],
})
export class AppModule {}
