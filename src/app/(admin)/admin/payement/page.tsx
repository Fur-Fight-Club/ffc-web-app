"use client";

import { useState } from "react";

export default function ArenaAdmin() {
  const [visibleModal, setVisibleModal] = useState(false);

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
