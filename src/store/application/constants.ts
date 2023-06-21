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
  userAgent: {
    browser: {
      name?: string;
      version?: string;
    };
    os: {
      name?: string;
      version?: string;
    };
    platform?: string;
    language?: string;
  };
}

export interface MouseClickEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  pathname: string;
  click: {
    x: number;
    y: number;
  };
  window: {
    width: number;
    height: number;
  };
  userAgent: {
    browser: {
      name?: string;
      version?: string;
    };
    os: {
      name?: string;
      version?: string;
    };
    platform?: string;
    language?: string;
  };
}

export interface LeaveAppEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  visitedPages: {
    page: string;
    timestamp: number;
  }[];
  userAgent: {
    browser: {
      name?: string;
      version?: string;
    };
    os: {
      name?: string;
      version?: string;
    };
    platform?: string;
    language?: string;
  };
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
