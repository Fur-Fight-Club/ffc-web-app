import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
}

export const updateMonstersHandler = (error: GenericApiError) => {
  console.log({ updateMonstersHandler: JSON.stringify(error.error.data) });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      toast.error("Vérifiez tous les champs et réessayez.");

    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
  }
};
