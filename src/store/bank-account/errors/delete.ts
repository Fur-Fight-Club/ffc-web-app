import { GenericApiError } from '@store/store.model';
import toast from 'react-hot-toast';

export enum Errors {}

export const deleteBankAccountErrorsHandler = (error: GenericApiError) => {
  switch (error.error.data.message) {
    default:
      toast.error('🚫 Oups ! Une erreur est survenue, veuillez réessayer');
      break;
  }
};
