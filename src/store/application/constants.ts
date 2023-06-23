import { App } from "./application.model";
import { v4 as uuidv4 } from "uuid";

export const initialState: App = {
  user: {
    id: -1,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "USER",
    email_token: "",
    is_email_verified: false,
    Invoice: [],
    MatchMessage: [],
    Monster: [],
    StripeAccount: [],
    Wallet: undefined,
    transaction: [],
  },
  loading: false,
  notification_token: null,
  token: "",
  analytics: {
    uuid: uuidv4(),
    enabled: true,
    session: {
      pageVisited: [],
      startTime: -1,
      endTime: -1,
    },
  },
};

export interface ButtonClickEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  pathname: string;
  buttonContent: string;
}

export interface PathnameChangeEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  startTime: number;
  endTime: number;
  userAgent: UserAgent;
}

export interface MouseClickEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  pathname: string;
  click: Click;
  window: Window;
  userAgent: UserAgent;
}

export interface LeaveAppEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  visitedPages: VisitedPage[];
  userAgent: UserAgent;
}

export interface UserAgent {
  browser: Browser;
  os: OS;
  platform?: string;
  language?: string;
}

export interface OS {
  name?: string;
  version?: string;
}

export type OsName = "Windows" | "Mac OS" | "Linux" | "Android" | "iOS";

export interface Browser {
  name?: BrowserName;
  version?: string;
}

export type BrowserName =
  | "Chrome"
  | "Firefox"
  | "Safari"
  | "Opera"
  | "Edge"
  | "IE";

export interface VisitedPage {
  page: string;
  timestamp: number;
}

export interface Window {
  width: number;
  height: number;
}

export interface Click {
  x: number;
  y: number;
}

export const reducerPath = "applicationApi";

export const CACHE_KEY = "App";

export const endpoint = {
  login: "user/login",
  register: "user/register",
  askResetPassword: "account/ask-reset-password",
  me: "user/me",
  update: "user/update",
  notificationToken: "push-notifications",
  notificationTokenActive: "push-notifications/active",
  analytics: "analytics-events",
};
