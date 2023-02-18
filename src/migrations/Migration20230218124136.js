'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230218124136 extends Migration {

  async up() {
    this.addSql('create table "game" ("id" uuid not null, "created_at" timestamptz(3) not null default now(), "updated_at" timestamptz(3) not null default now(), "game_points" text check ("game_points" in (\'PLANNED\', \'IN_PROGRESS\', \'FINISHED\', \'CANCELLED\')) not null default \'PLANNED\', constraint "game_pkey" primary key ("id"));');

    this.addSql('create table "tournament" ("id" uuid not null, "created_at" timestamptz(3) not null default now(), "updated_at" timestamptz(3) not null default now(), "name" varchar(255) not null, "type" text check ("type" in (\'ROUND_ROBIN\', \'ELIMINATION\')) not null default \'ROUND_ROBIN\', "public_code" varchar(255) null, "is_high_score_win" varchar(255) not null default true, "best_of" int null, "points_on_win" int null, "points_on_tie" int null, "points_on_loss" int null, constraint "tournament_pkey" primary key ("id"));');

    this.addSql('create table "player" ("id" uuid not null, "created_at" timestamptz(3) not null default now(), "updated_at" timestamptz(3) not null default now(), "name" varchar(255) not null, "tournament_id" uuid not null, constraint "player_pkey" primary key ("id"));');

    this.addSql('create table "score" ("id" uuid not null, "created_at" timestamptz(3) not null default now(), "updated_at" timestamptz(3) not null default now(), "game_points" varchar(255) not null default 0, "raking_points" int null, "player_id" uuid not null, "game_id" uuid not null, constraint "score_pkey" primary key ("id"));');

    this.addSql('alter table "player" add constraint "player_tournament_id_foreign" foreign key ("tournament_id") references "tournament" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "score" add constraint "score_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "score" add constraint "score_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade on delete cascade;');
  }

  async down() {
    this.addSql('alter table "score" drop constraint "score_game_id_foreign";');

    this.addSql('alter table "player" drop constraint "player_tournament_id_foreign";');

    this.addSql('alter table "score" drop constraint "score_player_id_foreign";');

    this.addSql('drop table if exists "game" cascade;');

    this.addSql('drop table if exists "tournament" cascade;');

    this.addSql('drop table if exists "player" cascade;');

    this.addSql('drop table if exists "score" cascade;');
  }

}
exports.Migration20230218124136 = Migration20230218124136;
