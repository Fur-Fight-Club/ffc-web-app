'use client';

import { Input } from '@nextui-org/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.scss';

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log(watch('example'));

  interface IFormInput {
    email: string;
    password: string;
  }

  return (
    <div className={styles.container}>
      <h1>Fur Fight Club</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          placeholder="email..."
          {...register('email')}
          required={true}
        />
        <Input
          type="password"
          label="password..."
          {...register('password')}
          required={true}
        />
        <Input type="submit" />
      </form>
    </div>
  );
}
