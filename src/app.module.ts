import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [MikroOrmModule.forRoot(), TournamentsModule],
})
export class AppModule {}
