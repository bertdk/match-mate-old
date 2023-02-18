import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [MikroOrmModule.forRoot(), TournamentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
