"use client";

import { Modal } from "@nextui-org/react";
import { Arena } from "ffc-prisma-package/dist/client";
import Image from "next/image";

export const ModalShowImageArena = (props: {
  visible: boolean;
  closeHandler: any;
  picture: Arena["picture"] | undefined;
}) => {
  const { visible, closeHandler, picture } = props;

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Body>
        <div style={{ height: "400px" }}>
          <Image
            objectFit="contain"
            fill
            // @ts-ignore
            src={picture}
            alt="Picture of the author"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
