export class CreateTournamentDto {
  name: string;
  bestOf?: number;
  pointsOnWin?: number;
  pointsOnTie?: number;
  pointsOnLoss?: number;
}
