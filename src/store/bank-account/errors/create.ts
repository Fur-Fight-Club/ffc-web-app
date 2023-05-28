import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  INVALID_IBAN = "The provided IBAN is not a valid one.",
  ALREADY_EXISTS = "Bank account already exists",
}

export const createBankAccountErrorsHandler = (error: GenericApiError) => {
  console.log({ createBankAccountErrorsHandler: error.error.data });

  switch (error.error.data.message) {
    case Errors.INVALID_IBAN:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Le numéro IBAN fourni n'est pas valide.",
      });
      break;
    case Errors.ALREADY_EXISTS:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Vous avez déjà un compte bancaire enregistré.",
      });
      break;
    default:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Une erreur inconnue est survenue, veuillez réessayer.",
      });
      break;
  }
};
