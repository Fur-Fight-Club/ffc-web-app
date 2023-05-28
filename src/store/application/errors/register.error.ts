import { GenericApiError } from "@store/store.model";
import Toast from "react-native-toast-message";

export enum RegisterErrors {
  VALIDATION = "Validation failed",
  NOT_FOUND = "User not found",
  INVALID_CREDENTIALS = "Invalid credentials",
}

export const registerErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case RegisterErrors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "✍️ Oups !",
        text2: "Veuillez vérifier tous les champs",
      });
      break;
    case RegisterErrors.NOT_FOUND:
    case RegisterErrors.INVALID_CREDENTIALS:
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
