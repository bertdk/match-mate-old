import { Collection, Entity, Enum, OneToMany } from '@mikro-orm/core';

import { GameStatus } from '../contracts/enums/gameStatus.enum';
import { Base } from './base.entity';
import { Score } from './score.entity';

@Entity()
export class Game extends Base<Game> {
  @Enum({ items: () => GameStatus, default: GameStatus.planned })
  public gamePoints = GameStatus.planned;

  @OneToMany(() => Score, score => score.game)
  public scores = new Collection<Score>(this);
}
