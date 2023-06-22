"use client";

import { useQueryClient } from "react-query";

import { Button } from "@components/UI/Button/Button.component";
import { useEffect, useState } from "react";
import { useGetArenasQuery } from "src/store/arenas/slice";

export default function ArenaAdmin() {
  const queryClient = useQueryClient();

  const [arenas, setArenas] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);

  const { data } = useGetArenasQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <div>Arena admin page</div>
      <Button>Ajouter une arène (modal)</Button>
    </>
  );
}
