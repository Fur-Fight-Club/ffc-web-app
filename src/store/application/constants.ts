import { App } from "./application.model";

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
    Wallet: null,
    transaction: [],
  },
  loading: false,
  notification_token: null,
  token: "",
};

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
};
