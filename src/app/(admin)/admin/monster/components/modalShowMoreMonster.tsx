"use client";

import { Button } from "@components/UI/Button/Button.component";
import { Modal, Text } from "@nextui-org/react";

export const ModalShowMoreMonster = (props: {
  visible: boolean;
  closeHandler: any;
}) => {
  const { visible, closeHandler } = props;

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Information sur le monstre
        </Text>
      </Modal.Header>
      <Modal.Body>
        <p>test</p>
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
