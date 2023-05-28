import { GenericApiError } from "@store/store.model";
import Toast from "react-native-toast-message";

export enum AskResetPasswordErrors {
  VALIDATION = "Validation failed",
  NOT_FOUND = "Can find this user",
}

export const askResetPasswordErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case AskResetPasswordErrors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "✍️ Oups !",
        text2: "Veuillez vérifier votre adresse mail",
      });
      break;
    case AskResetPasswordErrors.NOT_FOUND:
      Toast.show({
        type: "error",
        text1: "🤨 Hum...",
        text2: "Nous ne trouvons pas votre adresse mail",
      });
      break;

    default:
      Toast.show({
        type: "error",
        text1: "🚫 Oups !",
        text2: "Une erreur est survenue, veuillez réessayer",
      });
      break;
  }
};
