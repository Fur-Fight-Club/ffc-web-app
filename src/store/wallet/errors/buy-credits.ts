import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
}

export const buyCreditsErrorsHandler = (error: GenericApiError) => {
  console.log({ buyCreditsErrorsHandler: JSON.stringify(error) });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "🪙 Oups !",
        text2: "Impossible d'acheter cette quantité de crédits.",
      });
      break;
    default:
      Toast.show({
        type: "error",
        text1: "🪙 Oups !",
        text2: "Une erreur inconnue est survenue, veuillez réessayer.",
      });
      break;
  }
};
