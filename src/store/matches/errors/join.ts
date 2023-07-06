import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  MMR_TOO_LOW = "ConflictException: The MMR of the monster is too low",
  MMR_TOO_HIGH = "ConflictException: The MMR of the monster is too high",
  SAME_MONSTER = "ConflictException: Is actually the same monster in the match",
  MATCH_FULL = "ConflictException: The match is already full",
}

export const joinMatchesErrorHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case Errors.MMR_TOO_LOW:
      toast.error(
        "Le MMR de votre monstre est trop bas pour participer a ce match 😣"
      );
      break;
    case Errors.MMR_TOO_HIGH:
      toast.error(
        "Le MMR de votre monstre est trop haut pour participer a ce match 😣"
      );
      break;
    case Errors.SAME_MONSTER:
      toast.error(
        "Bizarre de faire combattre le même monstre contre lui-même, non ? 🤔"
      );
      break;
    case Errors.MATCH_FULL:
      toast.error("Ce match est déjà plein, désolé 🫠");
      break;

    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
  }
};
