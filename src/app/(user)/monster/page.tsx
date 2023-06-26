"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type MonsterPageProps = {};

const MonsterPage = (props: MonsterPageProps) => {
  const router = useRouter();
  return (
    <div>
      <div>MonsterPage</div>
      <Button onClick={() => router.push("monster/create")}>
        Ajouter un monstre
      </Button>
    </div>
  );
};

export default MonsterPage;
