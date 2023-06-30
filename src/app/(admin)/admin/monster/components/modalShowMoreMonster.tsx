"use client";

import { Button } from "@components/UI/Button/Button.component";
import { Input, Modal, Text } from "@nextui-org/react";
import { MonsterCard } from "src/app/(admin)/components/Card/MonsterCard/monsterCard";
import { useGetUserQuery } from "src/store/application/slice";

export const ModalShowMoreMonster = (props: {
  visible: boolean;
  closeHandler: any;
  monster: any;
}) => {
  const { visible, closeHandler, monster } = props;

  const { data: userData } = useGetUserQuery(monster?.fk_user);
  const userName = userData?.user.firstname + " " + userData?.user.lastname;

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" b size={18}>
          Information sur le monstre
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input label="Propriétaire :" value={userName} />

        <MonsterCard monster={monster} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color="error"
          onPress={closeHandler}
          analyticsId="close-modal-account"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export type first = { second: any };
