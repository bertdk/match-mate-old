import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PaginatedDto, TournamentType } from 'contracts';
import { Tournament } from 'entities';

import { CreateTournamentDto, TournamentDto, UpdateTournamentDto } from './dto';

@Injectable()
export class TournamentsService {
  constructor(private readonly em: EntityManager) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<TournamentDto> {
    const tournament = new Tournament();
    tournament.assign(createTournamentDto);
    await this.em.persistAndFlush(tournament);

    return tournament;
  }

  async findAll(): Promise<PaginatedDto<TournamentDto>> {
    // const [results, total] = await this.em.findAndCount(Tournament, {});
    const [results, total] = [[{ name: 'test', type: TournamentType.roundRobin, isHighScoreWin: true }], 0];
    return { results, total };
  }

  async findOne(id: string): Promise<TournamentDto> {
    return await this.em.findOneOrFail(Tournament, id);
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<TournamentDto> {
    const tournament = await this.em.findOneOrFail(Tournament, id);
    tournament.assign(updateTournamentDto);
    await this.em.flush();

    return tournament;
  }

  async remove(id: string) {
    const tournament = await this.em.findOneOrFail(Tournament, id);
    await this.em.removeAndFlush(tournament);
  }
}
