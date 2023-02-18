import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

import { TournamentType } from '../contracts/enums/tournamentType.enum';
import { Base } from './base.entity';
import { Player } from './player.entity';

@Entity()
export class Tournament extends Base<Tournament> {
  @Property()
  public name: string;

  @Enum({ items: () => TournamentType, default: TournamentType.roundRobin })
  public type: TournamentType.roundRobin;

  @Property({ nullable: true })
  public publicCode?: string;

  @Property({ default: true })
  public isHighScoreWin = true;

  @Property({ nullable: true })
  public bestOf?: number;

  @Property({ nullable: true })
  public pointsOnWin?: number;

  @Property({ nullable: true })
  public pointsOnTie?: number;

  @Property({ nullable: true })
  public pointsOnLoss?: number;

  @OneToMany(() => Player, player => player.tournament)
  public players = new Collection<Player>(this);
}
