import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {}

export const getMatchesErrorHandler = (error: GenericApiError) => {
  console.log({ getMatchesErrorHandler: error.error.data.message });
  console.log(JSON.stringify(error.error.data));

  switch (error.error.data.message) {
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
  }
};
