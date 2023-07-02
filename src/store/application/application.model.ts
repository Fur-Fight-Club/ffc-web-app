import { NotificationSettings, Wallet } from "ffc-prisma-package/dist/client";

import { Monster } from "../monsters/monsters.model";
import {
  Invoice,
  StripeAccount,
  StripePayments,
  Transaction,
} from "../payments/payments.model";
import { MatchMessage } from "../notifications/notifications.model";

export interface App {
  user: User;
  loading: boolean;
  notification_token: string | null;
  token: string;
  analytics: {
    firstTimeVisiting: boolean;
    enablePerformanceWidget: boolean;
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
  role: "ADMIN" | "USER" | "MONSTER_OWNER" | null;
  email_token: string;
  is_email_verified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UpdateRequest {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UpdateResponse {
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

export interface UpsertNotificationTokenRequest {
  token: string;
  platform: "IOS" | "ANDROID" | "WEB";
}

export type UpsertNotificationTokenResponse = NotificationSettings;

export interface DeleteNotificationTokenRequest {
  token: string;
}

export interface UpdateTokenActiveStateRequest {
  token: string;
  active: boolean;
}

export interface GetHeatmapDataDto {
  count?: number;
  route: string;
}

export interface HeatmapData {
  window: {
    width: number;
    height: number;
  };
  click: {
    x: number;
    y: number;
  };
}

export interface DemographicDataEventDto {
  ip: string;
}

export interface DemographicData {
  id: string;
  event: "demographic";
  timestamp: number;
  ip: string;
  isp: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface GetStatCardResponse {
  button: number;
  mouse: number;
  pathname: number;
  closeApp: number;
  uniqueVisitor: number;
  debounce: number;
  averagePageVisited: number;
  averageTimeSpent: string;
}

export interface GetTablesDataResponse {
  click: {
    event: string;
    count: number;
    content: string | undefined;
  }[];
  averageTime: {
    page: string;
    averageTimeSpent: number;
    readableTimeSpent: string;
  }[];
}

export interface GetChartsDataResponse {
  lastVisitors: {
    day: number;
    count: number;
  }[];
  averages: {
    timeSpent: CharData;
  };
  proportions: {
    platform: CharData;
    browser: CharData;
    lang: CharData;
    country: CharData;
    provider: CharData;
  };
}

export interface CharData {
  labels: string[];
  data: number[];
}
