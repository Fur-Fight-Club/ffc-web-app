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

export type BracketMatch = {
  id: number | string;
  href?: string;
  name?: string;
  nextMatchId: number | string | null;
  nextLooserMatchId?: number | string;
  tournamentRoundText?: string;
  startTime: string;
  state: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | string;
  participants: BracketParticipant[];
  [key: string]: any;
};

export type BracketParticipant = {
  id: string | number;
  isWinner?: boolean;
  name?: string;
  status?: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | string | null;
  resultText?: string | null;
  [key: string]: any;
};
