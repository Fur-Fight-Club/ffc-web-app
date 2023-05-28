'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Divider from './components/Divider';
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
      <h1>Connectez-vous</h1>
      <p>
        {"Faite combattre votre monstre, parier dessus, et gagner de l'argent"}
      </p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          className={styles.input}
          label="Adresse email :"
          placeholder="pouet@example.com"
          {...register('email')}
          bordered
          borderWeight="light"
          color={errors.email?.message ? 'error' : undefined}
          helperText={errors.email?.message}
          helperColor="error"
        />

        <Spacer y={1.3} />

        <Input.Password
          label="Mot de passe :"
          placeholder="********"
          {...register('password')}
          bordered
          borderWeight="light"
          color={errors.password?.message ? 'error' : undefined}
          helperText={errors.password?.message}
          helperColor="error"
        />

        <Spacer y={1} />

        <Button type="submit">Connexion</Button>
      </form>
      <Divider />
      <p>Pas de compte ? Inscivez-vous ici</p>
    </div>
  );
}
