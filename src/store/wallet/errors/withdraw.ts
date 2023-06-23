import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
  NOT_ENOUGH_MONEY = "Not enough credits, you need at least 10.000 credits to withdraw your bets",
  NO_BANK_ACCOUNT = "You need to add a bank account before withdrawing your bets",
}

export const withdrawErrorsHandler = (error: GenericApiError) => {
  console.log({ withdrawErrorsHandler: error.error.data.message });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      toast.error("Veuillez saisir un montant valide.");
      break;
    case Errors.NOT_ENOUGH_MONEY:
      toast.error("Vous n'avez pas assez de crédits pour retirer vos paris.");
      break;
    case Errors.NO_BANK_ACCOUNT:
      toast.error("Pas de compte bancaire, pas de retrait !");
      break;
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
      break;
  }
};
