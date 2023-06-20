"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ResetPasswordType, resetPasswordSchema } from "src/model/user.schema";
import styles from "./page.module.scss";
import { Button } from "@components/UI/Button/Button.component";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    console.log("submit", data);
    // TODO : call api and check error return
    toast.success(
      "Demande de réinitialisation de mot de passe envoyée ! Vérifiez vos emails"
    );
  };

  console.log(watch("email"));

  return (
    <div className={styles.container}>
      <h1>Un trou de mémoire ?</h1>
      <p className={styles.paragraph}>
        {
          "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."
        }
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
        <Spacer y={1.5} />
        <Button type="submit" analyticsId="login-button-reset-password">
          Connexion
        </Button>
        <Spacer y={1.5} />
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        La mémoire vous revient ?{" "}
        <Link href={"/login"}>
          <span className={styles.ctaLabel}>Connectez-vous ici</span>
        </Link>
      </p>
      <p className={styles.linkLabel}>
        Pas de compte ?{" "}
        <Link href={"/register"}>
          <span className={styles.ctaLabel}>Inscrivez-vous ici</span>
        </Link>
      </p>
      <Spacer y={3} />
    </div>
  );
}
