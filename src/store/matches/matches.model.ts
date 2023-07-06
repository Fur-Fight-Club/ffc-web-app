import { Arena } from "ffc-prisma-package/dist/client";
import { Monster, WeightCategoryType } from "../monsters/monsters.model";
import { MatchMessage } from "../notifications/notifications.model";

export interface Matches {
  matches: Match[];
}

export type MatchWaitingListStatus = "ACCEPTED" | "REJECTED" | "PENDING";

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
  Monster1: Monster;
  Monster2: Monster;
  fk_monster_1: number;
  fk_monster_2: number;
  matchStartDate: Date;
  matchEndDate: Date;
  MatchWaitingList: MatchWaitingList[];
  Arena: Arena;
  fk_arena: number;
  winner?: Monster;
  fk_tournament?: number;
  fk_winner?: number;
  MatchMessage: MatchMessage[];
  weight_category: WeightCategoryType;
  entryCost: number;
  Transaction: {
    monsterId: number;
    Wallet: {
      User: {
        firstname: string;
        lastname: string;
      };
    };
    Monster: {
      name: Monster["name"];
    };
    amount: number;
  }[];
}

export interface PlaceBet {
  matchId: number;
  monster: number;
  amount: number;
}

export interface MatchFormState {
  step: number;
  monster: Monster | null;
  arena: Arena | null;
  date: string | null;
}

export interface CreateMatchForm extends MatchFormState {
  bet: number;
}

export interface JoinMatchForm {
  step: number;
  match: Match | null;
  monster: Monster | null;
}
