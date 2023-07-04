import { toast } from "react-hot-toast";
import { GenericApiError } from "src/store/store.model";

export enum Errors {
  ALREADY_ENDED = "Match already ended",
  MATCH_FULL = "Next match already filled",
  TOURNAMENT_FULL = "Tournament is full",
  ALREADY_JOINED = "Monster already in tournament",
}

export const getTournamentsErrorsHandler = (error: GenericApiError) => {
  console.log({ buyCreditsErrorsHandler: error.error.data });

  switch (error.error.data.message) {
    case Errors.ALREADY_ENDED:
      toast.error("La manche est déjà terminée.");
      break;
    case Errors.MATCH_FULL:
      toast.error("Le match suivant est déjà complet.");
      break;
    case Errors.TOURNAMENT_FULL:
      toast.error("Le tournoi est déjà complet. Pas de place pour vous 🫣");
      break;
    case Errors.ALREADY_JOINED:
      toast.error("Vous avez déjà rejoint ce tournoi.");
    default:
      toast.error("Une erreur inconnue est survenue, veuillez réessayer.");
      break;
  }
};
