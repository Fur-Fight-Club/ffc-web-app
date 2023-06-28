"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  SetNewPasswordType,
  setNewPasswordSchema,
} from "src/model/user.schema";
import styles from "./page.module.scss";
import { Button } from "@components/UI/Button/Button.component";
import { useResetPasswordMutation } from "src/store/user/slice";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function SetNewPassword() {
  const [setNewPassword, { isSuccess }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetNewPasswordType>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const onSubmit = (data: SetNewPasswordType) => {
    console.log("submit", data);
    // Check if password and confirmPassword are the same
    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
    setNewPassword({ email_token: token ?? "", password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <div className={styles.container}>
      <h1>Votre nouveau mot de passe</h1>
      <p className={styles.paragraph}>
        Saisissez votre nouveau mot de passe pour parier de nouveau !
      </p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Spacer y={1.3} />
        <Input
          label="Mot de passe :"
          placeholder="************"
          register={register("password")}
          errorMessage={errors.password?.message}
          type="password"
        />
        <Spacer y={1.3} />
        <Input
          label="Confirmer mot de passe :"
          placeholder="************"
          register={register("confirmPassword")}
          type="password"
          errorMessage={errors.confirmPassword?.message}
        />
        <Spacer y={1.5} />
        <Button type="submit" analyticsId="set-new-password">
          Changer mon mot de passe
        </Button>
        <Spacer y={1.5} />
      </form>
    </div>
  );
}
