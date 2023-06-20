import { BankAccount } from "./bank-account.model";

export const initialState: BankAccount = {
  id: -1,
  bank_account_id: "",
  country: "",
  fk_stripe_account: -1,
  last4: "",
  fringerprint: "",
};

export const reducerPath = "bankAccountApi";

export const CACHE_KEY = "BankAccount";

export const endpoint = {
  bankAccount: `${process.env.NEXT_PUBLIC_ENDPOINT}/bank-account`,
};
