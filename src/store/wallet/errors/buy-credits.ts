import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
}

export const buyCreditsErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case Errors.VALIDATION:
      toast.error("Impossible d'acheter cette quantité de crédits.");
      break;
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
      break;
  }
};
