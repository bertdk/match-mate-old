import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from 'contracts';
import { ApiPaginatedResponse } from 'utils';

import { CreateTournamentDto, TournamentDto, UpdateTournamentDto } from './dto';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
@ApiTags('Tournaments')
@ApiExtraModels(PaginatedDto, TournamentDto)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  /* Create a new tournament */
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  /* Get all tournaments */
  @Get()
  @ApiPaginatedResponse(TournamentDto)
  findAll() {
    return this.tournamentsService.findAll();
  }

  /* Get a tournaments by id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(id);
  }

  /* Update a tournaments */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }

  /* Delete a tournaments */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(id);
  }
}
