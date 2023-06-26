"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useConfirmAccountMutation } from "src/store/user/slice";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const emailToken = searchParams.get("token");

  const [confirmAccountMutation, { data }] = useConfirmAccountMutation();

  useEffect(() => {
    if (emailToken) {
      confirmAccountMutation({ email_token: emailToken });

      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
  }, [emailToken]);
}
