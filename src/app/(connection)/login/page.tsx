'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './page.module.scss';

const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .required();

type FormData = z.infer<typeof loginSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FormData) => {
    console.log('submit', data);
  };

  console.log(watch('email'), watch('password'));

  return (
    <div className={styles.container}>
      <h1>Fur Fight Club</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" placeholder="email..." {...register('email')} />
        <p>{errors.email?.message}</p>
        <Input type="password" label="password..." {...register('password')} />
        <p>{errors.password?.message}</p>
        <Input type="submit" />
      </form>
    </div>
  );
}
