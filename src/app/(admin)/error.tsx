"use client";

import catLoader from "@assets/animations/badCat.json";
import clown from "@assets/animations/clown.json";
import { Button } from "@nextui-org/react";
import { isUserAdmin } from "@utils/utils";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const { user } = useSelector(applicationState);

  if (!isUserAdmin(user)) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          width: "35rem",
        }}
      >
        <Lottie animationData={catLoader} />
        <h4>{error.message}</h4>
        <Button onClick={() => router.push("/")}>
          Revenir au menu principal
        </Button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          width: "35rem",
        }}
      >
        <Lottie animationData={clown} />
        <h4>{error.message}</h4>
        <Button onClick={() => router.push("/")}>Ba alors ça bug ?</Button>
      </div>
    );
  }
}
