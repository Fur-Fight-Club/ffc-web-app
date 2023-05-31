import { Monster, WeightCategoryType } from '../monsters/monsters.model';

export interface Matches {
  matches: Match[];
}

export type MatchWaitingListStatus = 'ACCEPTED' | 'REJECTED' | 'PENDING';

export interface MatchWaitingList {
  id: number;
  Match: Match;
  fk_match: number;
  Monster: Monster;
  fk_monster: number;
  status: MatchWaitingListStatus;
}

export interface Match {
  id: number;
  monster1: object;
  monster2: object;
  fk_monster1: number;
  fk_monster2: number;
  matchStartDate: Date;
  matchEndDate: Date;
  MatchWaitingList: object[];
  Arena: object;
  fk_arena: number;
  MatchMessage: object[];
  weight_category: WeightCategoryType;
}
