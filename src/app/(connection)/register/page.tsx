'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import Divider from '@components/UI/Divider';
import Input from '@components/UI/Input';
import { Button, Row, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RegisterType, registerSchema } from 'src/model/user.schema';
import styles from './page.module.scss';

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: RegisterType) => {
    console.log('submit', data);
    // TODO : call api and check error return
    toast.success(
      'Inscription réussie ! Allez vérifier vos emails pour valider votre compte'
    );
  };

  console.log(
    watch('lastname'),
    watch('firstname'),
    watch('email'),
    watch('password'),
    watch('confirmPassword')
  );

  return (
    <div className={styles.container}>
      <h1>Inscrivez-vous</h1>
      <p>
        {"Faite combattre votre monstre, parier dessus, et gagner de l'argent"}
      </p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Row>
          <Input
            label="Prénom :"
            placeholder="Adrianus 1er"
            register={register('firstname')}
            errorMessage={errors.firstname?.message}
            fullWidth
          />
          <Spacer x={1} />
          <Input
            label="Nom :"
            placeholder="Morinus"
            register={register('lastname')}
            errorMessage={errors.lastname?.message}
            fullWidth
          />
        </Row>
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
        <Spacer y={1.3} />
        <Input
          label="Mot de passe :"
          type="password"
          placeholder="********"
          register={register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <Spacer y={1.5} />
        <Button type="submit">{"S'inscrire"}</Button>
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        Déjà inscrit ?{' '}
        <Link href={'/login'}>
          <span className={styles.ctaLabel}>connectez-vous ici</span>
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
