import {
  Invoice,
  StripeBankAccount,
  Transaction,
} from "ffc-prisma-package/dist/client";

export interface Wallet {
  credits: number;
  euro: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface WithdrawResponse {
  transaction: Transaction;
  invoice: Invoice;
  withdraw: {
    feesPercentage: string;
    fees: number;
    amount: number;
    bank_account: StripeBankAccount;
  };
  session_uuid: string;
}

export interface BuyCreditsRequest {
  credits: "475" | "1000" | "2050" | "3650" | "5350" | "11000";
}

export interface BuyCreditsResponse {
  transaction: Transaction;
  invoice: Invoice;
  payment_url: string;
}
