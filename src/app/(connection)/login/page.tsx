'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import Divider from '@components/UI/Divider';
import Input from '@components/UI/Input';
import { Button, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LoginType, loginSchema } from 'src/model/user.schema';
import { useLoginMutation } from 'src/store/application/slice';
import styles from './page.module.scss';

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  const [loginMutation, { data: loginData }] = useLoginMutation();

  const onSubmit = (data: LoginType) => {
    console.log('submit', data);
    loginMutation(data);
    toast.error('Connexion échouée. Vérifiez vos identifiants et réessayez');
  };

  return (
    <div className={styles.container}>
      <h1>Connectez-vous</h1>
      <p>
        {"Faite combattre votre monstre, parier dessus, et gagner de l'argent"}
      </p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Spacer y={1.3} />

        <Input
          label="Adresse email :"
          placeholder="mrledirecteur@pedagogique.com"
          register={register('email')}
          errorMessage={errors.email?.message}
        />

        <Spacer y={1.3} />

        <Input
          label="Mot de passe :"
          type="password"
          placeholder="********"
          register={register('password')}
          errorMessage={errors.password?.message}
        />

        <Spacer y={2.5} />

        <Button type="submit">Connexion</Button>
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        Pas de compte ?{' '}
        <Link href={'/register'}>
          <span className={styles.ctaLabel}>Inscrivez-vous ici</span>
        </Link>
      </p>
      <p className={styles.linkLabel}>
        Mot de passe oublié ?{' '}
        <Link href={'/reset-password'}>
          <span className={styles.ctaLabel}>
            Réinitialisez votre mot de passe
          </span>
        </Link>
      </p>
      <Spacer y={3} />
    </div>
  );
}
