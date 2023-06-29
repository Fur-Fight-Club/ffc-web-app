"use client";

import { Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useGetAllMonsterFromOneUserQuery } from "src/store/monsters/slice";
import { MonsterCard } from "../Card/MonsterCard/monsterCard";

export const ModalsMonster = (props: {
  visible: boolean;
  closeHandler: any;
  userId: number;
}) => {
  const { visible, closeHandler, userId } = props;

  const [monsters, setMonsters] = useState([]);

  const { data: monsterData } = useGetAllMonsterFromOneUserQuery(userId);

  useEffect(() => {
    setMonsters(monsterData);
  }, [monsterData]);

  if (monsters?.length === 0) {
    return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Cette utilisateur n'a pas encore de monstre
          </Text>
        </Modal.Header>
      </Modal>
    );
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Voir les monstres de l'utilisateur
        </Text>
      </Modal.Header>

      <Modal.Body>
        {monsters?.length > 0 &&
          monsters.map((monster: any) => (
            <MonsterCard monster={monster} key={monster.id} />
          ))}
      </Modal.Body>
    </Modal>
  );
};
