import toast from 'react-hot-toast';
import { GenericApiError } from './../../store.model';

export enum AskResetPasswordErrors {
  VALIDATION = 'Validation failed',
  NOT_FOUND = 'Can find this user',
}

export const askResetPasswordErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case AskResetPasswordErrors.VALIDATION:
      toast.error('Veuillez vérifier votre adresse mail');
      break;
    case AskResetPasswordErrors.NOT_FOUND:
      toast.error('Nous ne trouvons pas votre adresse mail');
      break;

    default:
      toast.error('🚫 Oups ! Une erreur est survenue, veuillez réessayer');
      break;
  }
};
