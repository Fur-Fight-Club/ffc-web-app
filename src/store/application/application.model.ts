import { NotificationSettings, Wallet } from "ffc-prisma-package/dist/client";

import { Monster } from "../monsters/monsters.model";
import { MatchMessage } from "../notifications/notifications.model";
import {
  Invoice,
  StripeAccount,
  StripePayments,
  Transaction,
} from "../payments/payments.model";

export interface App {
  user: User;
  loading: boolean;
  notification_token: string | null;
  token: string;
  analytics: {
    uuid: string;
    enabled: boolean;
    session: {
      pageVisited: { page: string; timestamp: number }[];
      startTime: number;
      endTime: number;
    };
  };
}

export interface User extends BasicUser {
  Invoice: Invoice[];
  MatchMessage: MatchMessage[];
  Monster: Monster[];
  StripeAccount: StripeAccount[];
  Wallet?: Wallet;
  transaction: Transaction[];
}

export interface BasicUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "MONSTER_OWNER";
  email_token: string;
  is_email_verified: boolean;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class UpdateRequest {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export class LoginResponse {
  [x: string]: any;
  access_token: string;
}

export class UpdateResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "USER" | "MONSTER_OWNER";
  email_token: string;
  is_email_verified: boolean;
}

export interface MeResponse {
  invoices: Invoice[];
  stripeAccount: StripeAccount[];
  stripePayments: StripePayments[];
  transaction: Transaction[];
  wallet: Wallet[];
  user: BasicUser;
}

export class UpsertNotificationTokenRequest {
  token: string;
  platform: "IOS" | "ANDROID" | "WEB";
}

export type UpsertNotificationTokenResponse = NotificationSettings;

export class DeleteNotificationTokenRequest {
  token: string;
}

export class UpdateTokenActiveStateRequest {
  token: string;
  active: boolean;
}
