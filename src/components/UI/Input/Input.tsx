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
  const commonProps: Partial<NextUIInputProps> = {
    ...props,
    ...register,
    bordered: true,
    borderWeight: 'light',
    color: errorMessage ? 'error' : undefined,
    helperText: errorMessage,
  };

  return props.type === 'password' ? (
    <NextUIInput.Password {...commonProps} />
  ) : (
    <NextUIInput {...commonProps} />
  );
};

export default Input;
