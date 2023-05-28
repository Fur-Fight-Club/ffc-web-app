import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
  NOT_ENOUGH_MONEY = "Not enough credits, you need at least 10.000 credits to withdraw your bets",
  NO_BANK_ACCOUNT = "You need to add a bank account before withdrawing your bets",
}

export const withdrawErrorsHandler = (error: GenericApiError) => {
  console.log({ withdrawErrorsHandler: error.error.data.message });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "🏧 Oups !",
        text2: "Veuillez saisir un montant valide.",
      });
      break;
    case Errors.NOT_ENOUGH_MONEY:
      Toast.show({
        type: "error",
        text1: "🏧 Oups !",
        text2: "Vous n'avez pas assez de crédits pour retirer vos paris.",
      });
      break;
    case Errors.NO_BANK_ACCOUNT:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Pas de compte bancaire, pas de retrait !",
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
