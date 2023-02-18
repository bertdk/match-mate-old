import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';

import { Base } from './base.entity';
import { Score } from './score.entity';
import { Tournament } from './tournament.entity';

@Entity()
export class Player extends Base<Player> {
  @Property()
  public name: string;

  @ManyToOne(() => Tournament, { onDelete: 'cascade' })
  public tournament: Tournament;

  @OneToMany(() => Score, score => score.player)
  public scores = new Collection<Score>(this);
}
