import { Arena } from "../arenas/arenas.model";
import { Match } from "../matches/matches.model";
import { Monster } from "../monsters/monsters.model";

export interface Tournament {
  id: number;
  name: string;
  entry_cost: number;
  tournamentStartDate?: Date;
  tournamentEndDate?: Date;
  Matches: Match[];
  Arena: Arena;
  fk_arena: number;
  winner?: Monster;
  fk_winner?: number;
  Participants: Monster[];
}

export interface CreateTournamentDto {
  name: string;
  entry_cost: number;
  arena_id: number;
}

export type UpdateTournamentDto = Partial<CreateTournamentDto> & {
  id: number;
};

export interface JoinTournamentDto {
  id: number;
  monster_id: number;
}

export interface JoinTournamentResponse {
  tournamentId: number;
  joined: boolean;
}

export interface EndRoundDto {
  id: number;
  winner_id: number;
  match_id: number;
}

export interface EndRoundResponse {
  endDate: Date;
  winner: number;
  nextMatch?: Match;
}
