import { GenericApiError } from "@store/store.model";
import Toast from "react-native-toast-message";

export enum LoginErrors {
  VALIDATION = "Validation failed",
  NOT_FOUND = "User not found",
  INVALID_CREDENTIALS = "Invalid credentials",
}

export const loginErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case LoginErrors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "✍️ Oups !",
        text2: "Veuillez vérifier tous les champs",
      });
      break;
    case LoginErrors.NOT_FOUND:
    case LoginErrors.INVALID_CREDENTIALS:
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Vos identifiants ne semblent pas corrects",
      });
      break;

    default:
      break;
  }
};
