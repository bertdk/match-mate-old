import { TournamentType } from 'contracts';

export class TournamentDto {
  name: string;
  type: TournamentType;
  isHighScoreWin: boolean;
  publicCode?: string;
  bestOf?: number;
  pointsOnWin?: number;
  pointsOnTie?: number;
  pointsOnLoss?: number;
}
