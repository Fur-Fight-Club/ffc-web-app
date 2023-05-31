import toast from 'react-hot-toast';
import { GenericApiError } from '../../store.model';

export enum Errors {}

export const deleteBankAccountErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    default:
      toast.error('🚫 Oups ! Une erreur est survenue, veuillez réessayer');
      break;
  }
};
