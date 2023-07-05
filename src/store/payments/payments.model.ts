import { User } from "../application/application.model";

export interface Pyaments {}
export interface Wallet {
  id: number;
  amount: number;
  Transaction: Transaction[];
  User: User;
  fk_user: number;
}

export interface Invoice {
  id: number;
  uuid: string;
  amount: number;
  User: User;
  fk_user: number;
  Transaction: Transaction[];
  url: string;
}

export type TransactionType = "IN" | "OUT";

export type TransactionTag = "WITHDRAW" | "BUY_CREDIT" | "FEE" | "BET";

export interface Transaction {
  id: number;
  type: TransactionType;
  tag: TransactionTag;
  Wallet: Wallet;
  walletId: number;
  Invoice: Invoice;
  invoiceId: number;
  StripePayments?: StripePayments;
  amount?: number;
}

export interface StripeAccount {
  id: number;
  User: User;
  fk_user: number;
  customer_id: string;
  customer_object: object;
  StripeBankAccount: StripeBankAccount[];
}

export interface StripeBankAccount {
  id: number;
  StripeAccount: StripeAccount;
  fk_stripe_account: number;
  bank_account_id: string;
  country: string;
  fingerprint: string;
  last4: string;
}

export type StripePaymentStatus = "SUCCEEDED" | "FAILED" | "PENDING";

export interface StripePayments {
  id: number;
  Transaction: Transaction;
  fk_transaction: number;
  status: StripePaymentStatus;
  session_id: string;
  session: object;
}

export type RequestFrom = "ios" | "android" | "web" | null;

export type Callback = "success" | "error";
