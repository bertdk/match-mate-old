import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Tournament } from 'entities';

import { CreateTournamentDto, UpdateTournamentDto } from './dto';

@Injectable()
export class TournamentsService {
  constructor(private readonly em: EntityManager) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const tournament = new Tournament();
    tournament.assign(createTournamentDto);
    await this.em.persistAndFlush(tournament);

    return tournament;
  }

  async findAll(): Promise<[Tournament[], number]> {
    return await this.em.findAndCount(Tournament, {});
  }

  async findOne(id: string): Promise<Tournament> {
    return await this.em.findOneOrFail(Tournament, id);
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
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
