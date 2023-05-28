import {
  Input as NextUIInput,
  InputProps as NextUIInputProps,
} from '@nextui-org/react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends Partial<NextUIInputProps> {
  errorMessage?: string | undefined;
  register?: UseFormRegisterReturn;
}

const Input = ({ errorMessage, register, ...props }: InputProps) => {
  return (
    <NextUIInput
      {...props}
      {...register}
      bordered
      borderWeight="light"
      color={errorMessage ? 'error' : undefined}
      helperText={errorMessage}
      helperColor="error"
    />
  );
};

export default Input;
