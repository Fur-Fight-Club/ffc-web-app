import { User } from "@store/application/application.model";
import { Match } from "@store/matches/matches.model";

export type NotificationPlatform = "IOS" | "ANDROID" | "WEB";

export interface NotificationSettings {
  id: number;
  User: User;
  fk_user: number;
  platform: NotificationPlatform;
  token: string;
  isActive: boolean;
}

export interface MatchMessage {
  id: number;
  Match: Match;
  fk_match: number;
  User: User;
  fk_user: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
