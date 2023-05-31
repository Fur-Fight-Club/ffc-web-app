import { GenericApiError } from '@store/store.model';
import toast from 'react-hot-toast';

export enum LoginErrors {
  VALIDATION = 'Validation failed',
  NOT_FOUND = 'User not found',
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export const loginErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case LoginErrors.VALIDATION:
      toast.error('Veuillez vérifier votre adresse mail');
      break;
    case LoginErrors.NOT_FOUND:
    case LoginErrors.INVALID_CREDENTIALS:
      toast.error('Vos identifiants ne semblent pas corrects');
      break;

    default:
      break;
  }
};
