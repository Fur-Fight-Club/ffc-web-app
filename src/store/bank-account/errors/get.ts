import toast from 'react-hot-toast';
import { GenericApiError } from '../../store.model';

export enum Errors {
  NOT_FOUND = 'Bank account not found',
}

export const getBankAccountErrorsHandler = (error: GenericApiError) => {
  console.log(error.error.data);
  switch (error.error.data.message) {
    case Errors.NOT_FOUND:
      break;
    default:
      toast.error('🚫 Oups ! Une erreur est survenue, veuillez réessayer');
      break;
  }
};
