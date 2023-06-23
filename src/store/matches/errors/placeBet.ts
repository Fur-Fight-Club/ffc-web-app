import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
  NOT_ENOUGH_MONEY = "You don't have enough credits",
  MINIMUM = "Minimum bet is 100 credits",
}

export const placeBetErrorHandler = (error: GenericApiError) => {
  console.log({ placeBetErrorHandler: error.error.data.message });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      toast.error("Veuillez vérifier le montant que vous avez saisi.");
      break;
    case Errors.NOT_ENOUGH_MONEY:
      toast.error("Vous n'avez pas assez de crédits.");
      break;
    case Errors.MINIMUM:
      toast.error("Le montant minimum est de 100 crédits.");
      break;
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
  }
};
