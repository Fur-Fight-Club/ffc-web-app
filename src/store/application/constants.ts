import { App } from './application.model';

export const initialState: App = {
  user: {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER',
    email_token: '',
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
  token: '',
};

export const reducerPath = 'applicationApi';

export const CACHE_KEY = 'App';

export const endpoint = {
  login: `${process.env.NEXT_PUBLIC_ENDPOINT}/user/login`,
  register: `${process.env.NEXT_PUBLIC_ENDPOINT}/user/register`,
  askResetPassword: `${process.env.NEXT_PUBLIC_ENDPOINT}account/ask-reset-password`,
  me: `${process.env.NEXT_PUBLIC_ENDPOINT}/user/me`,
  update: `${process.env.NEXT_PUBLIC_ENDPOINT}/user/update`,
  notificationToken: `${process.env.NEXT_PUBLIC_ENDPOINT}/push-notifications`,
  notificationTokenActive: `${process.env.NEXT_PUBLIC_ENDPOINT}/push-notifications/active`,
};
