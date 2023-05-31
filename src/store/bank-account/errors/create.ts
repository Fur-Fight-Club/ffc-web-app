import toast from 'react-hot-toast';
import { GenericApiError } from '../../store.model';

export enum Errors {
  INVALID_IBAN = 'The provided IBAN is not a valid one.',
  ALREADY_EXISTS = 'Bank account already exists',
}

export const createBankAccountErrorsHandler = (error: GenericApiError) => {
  console.log({ createBankAccountErrorsHandler: error.error.data });

  switch (error.error.data.message) {
    case Errors.INVALID_IBAN:
      toast.error("Le numéro IBAN fourni n'est pas valide.");
      break;
    case Errors.ALREADY_EXISTS:
      toast.error('Vous avez déjà un compte bancaire enregistré.');
      break;
    default:
      toast.error('🚫 Oups ! Une inconnue est survenue, veuillez réessayer');‡
      break;
  }
};
