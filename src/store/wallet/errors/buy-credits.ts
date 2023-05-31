import { GenericApiError } from '@store/store.model';
import toast from 'react-hot-toast';

export enum Errors {
  VALIDATION = 'Validation failed',
}

export const buyCreditsErrorsHandler = (error: GenericApiError) => {
  console.log({ buyCreditsErrorsHandler: JSON.stringify(error) });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      toast.error("Impossible d'acheter cette quantité de crédits.");
      break;
    default:
      toast.error('🚫 Oups ! Une erreur est survenue, veuillez réessayer');
      break;
  }
};
