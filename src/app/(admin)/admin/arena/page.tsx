"use client";

import { useQuery, useQueryClient } from "react-query";

import { Button } from "@components/UI/Button/Button.component";
import { useState } from "react";
import { getArenas } from "src/app/api/Arena/getArenas";

export default function ArenaAdmin() {
  const queryClient = useQueryClient();

  const [arenas, setArenas] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);

  const { data } = useQuery(["arena"], getArenas, {
    onSuccess: (data) => {
      setArenas(data);
      console.log(data);
    },
  });

  return (
    <>
      <div>Arena admin page</div>
      <Button>Ajouter une arène (modal)</Button>
    </>
  );
}
