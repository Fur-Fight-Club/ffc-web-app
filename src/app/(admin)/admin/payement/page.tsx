"use client";

import { useEffect, useState } from "react";
import { useGetAllPayementQuery } from "src/store/payments/slice";

export default function ArenaAdmin() {
  const [visibleModal, setVisibleModal] = useState(false);

  const { data, refetch } = useGetAllPayementQuery();

  useEffect(() => {
    refetch();
    console.log("All payement : ", data);
  }, []);

  const handleModal = () => {
    console.log("handle");
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const columns = [
    { name: "NOM", uid: "name" },
    { name: "TYPE", uid: "type" },
    { name: "MMR", uid: "mmr" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return <p>bonjour</p>;
}
