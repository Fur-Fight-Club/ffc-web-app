import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {}

export const getTournamentsErrorsHandler = (error: GenericApiError) => {
  console.log({ buyCreditsErrorsHandler: JSON.stringify(error) });

  switch (error.error.data.message) {
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
      break;
  }
};
