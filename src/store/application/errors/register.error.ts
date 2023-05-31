import { GenericApiError } from '@store/store.model';
import toast from 'react-hot-toast';

export enum RegisterErrors {
  VALIDATION = 'Validation failed',
  NOT_FOUND = 'User not found',
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export const registerErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    case RegisterErrors.VALIDATION:
      toast.error('Veuillez vérifier votre adresse mail');
      break;
    case RegisterErrors.NOT_FOUND:
    case RegisterErrors.INVALID_CREDENTIALS:
      toast.error('Vos identifiants ne semblent pas corrects');
      break;

    default:
      break;
  }
};
