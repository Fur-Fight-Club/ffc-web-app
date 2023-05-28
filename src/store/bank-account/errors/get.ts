import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  NOT_FOUND = "Bank account not found",
}

export const getBankAccountErrorsHandler = (error: GenericApiError) => {
  console.log(error.error.data);
  switch (error.error.data.message) {
    case Errors.NOT_FOUND:
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
