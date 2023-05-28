import { StripeBankAccount } from "ffc-prisma-package/dist/client";

export interface BankAccount extends StripeBankAccount {}

export interface AddBankAccountRequest {
  iban: string;
}

export type BankAccountResponse = StripeBankAccount;
