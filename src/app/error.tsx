"use client";

import catLoader from "@assets/animations/badCat.json";
import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

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
}