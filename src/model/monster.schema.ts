import { User } from "src/model/user.schema";

export type WeightCategoryType =
  | "A_FINE_BOI"
  | "HE_CHOMNK"
  | "A_HECKING_CHONKER"
  | "HEFTY_CHONK"
  | "MEGA_CHONKER"
  | "OH_LAWD_HE_COMIN";

export type MonsterType =
  | "ELEMENTARY"
  | "FANTASTIC"
  | "MYTHOLOGICAL"
  | "SCARY"
  | "AQUATIC"
  | "WINGED"
  | "PREHISTORIC"
  | "MECHANICAL"
  | "EXTRATERRESTRIAL"
  | "MAGICAL";

export interface Monster {
  id: number;
  name: string;
  weight: number;
  weight_category: WeightCategoryType;
  monster_type: MonsterType;
  User: User;
  fk_user: number;
  mmr: number;
//   MatchWaitingList: MatchWaitingList[];
//   MatchFighter1: Match[];
//   MatchFighter2: Match[];
  picture: string;
}
