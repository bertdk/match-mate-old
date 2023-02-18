import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { Base } from './base.entity';
import { Game } from './game.entity';
import { Player } from './player.entity';

@Entity()
export class Score extends Base<Score> {
  @Property({ default: 0 })
  public gamePoints = 0;

  @Property({ nullable: true })
  public rakingPoints?: number;

  @ManyToOne(() => Player, { onDelete: 'cascade' })
  public player: Player;

  @ManyToOne(() => Game, { onDelete: 'cascade' })
  public game: Game;
}
