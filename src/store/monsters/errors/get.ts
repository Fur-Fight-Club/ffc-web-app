import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {}

export const getMonstersHandler = (error: GenericApiError) => {
  console.log({ getMonstersHandler: error.error.data.message });

  switch (error.error.data.message) {
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
  }
};
