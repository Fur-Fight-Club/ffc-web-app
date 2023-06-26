"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@components/UI/Button/Button.component";
import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { LoginType, loginSchema } from "src/model/user.schema";
import { applicationState } from "src/store/application/selector";
import { useGetUserQuery, useLoginMutation } from "src/store/application/slice";
import { isUserAdmin, isUserLoggedIn } from "src/utils/utils";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const { user, token } = useSelector(applicationState);

  const [loginMutation, { isSuccess }] = useLoginMutation();

  const { refetch } = useGetUserQuery("");

  useEffect(() => {
    if (token !== "") {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isUserLoggedIn(user)) {
      isUserAdmin(user) ? router.push("/admin") : router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = (data: LoginType) => {
    loginMutation(data);
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
          register={register("email")}
          errorMessage={errors.email?.message}
        />

        <Spacer y={1.3} />

        <Input
          label="Mot de passe :"
          type="password"
          placeholder="********"
          register={register("password")}
          errorMessage={errors.password?.message}
        />

        <Spacer y={2.5} />

        <Button type="submit" analyticsId="login-button">
          Connexion
        </Button>
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        Pas de compte ?{" "}
        <Link href={"/register"}>
          <span className={styles.ctaLabel}>Inscrivez-vous ici</span>
        </Link>
      </p>
      <p className={styles.linkLabel}>
        Mot de passe oublié ?{" "}
        <Link href={"/reset-password"}>
          <span className={styles.ctaLabel}>
            Réinitialisez votre mot de passe
          </span>
        </Link>
      </p>
      <Spacer y={3} />
    </div>
  );
}
