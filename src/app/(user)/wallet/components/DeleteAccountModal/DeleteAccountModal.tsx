"use client";

import colors from "@styles/_colors.module.scss";
import { useEffect, useState } from "react";
import { Input, Modal, Row, Spacer, Text } from "@nextui-org/react";
import { useDeleteBankAccountMutation } from "src/store/bank-account/slice";
import { Button } from "@components/UI/Button/Button.component";

type DeleteAccountModalProps = {
  visibleProp: boolean;
  closeModal: any;
};

const DeleteAccountModal = ({
  visibleProp,
  closeModal,
}: DeleteAccountModalProps) => {
  const [visible, setVisible] = useState(visibleProp);

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  const [deleteBankAccount, { isSuccess: isSuccessDelete }] =
    useDeleteBankAccountMutation();

  const handleCreateBankAccount = () => {
    deleteBankAccount();
    closeModal();
  };

  return (
    <Modal
      closeButton
      blur
      width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={visible}
      css={{ p: "$20", pt: "$10", pb: "$15" }}
    >
      <Modal.Header>
        <Text size={22} weight="bold">
          🗑️ Compte bancaire
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text size={"$1xl"} color={colors.gray} css={{ textAlign: "center" }}>
          Voulez-vous vraiment supprimer votre compte bancaire ? Vous ne pourrez
          plus acheter ou retirer de crédits !
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={() => handleCreateBankAccount()}>
          Oui, je suis sûr !
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
