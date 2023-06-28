"use client";

import colors from "@styles/_colors.module.scss";
import { useEffect, useState } from "react";
import { Input, Modal, Row, Spacer, Text } from "@nextui-org/react";
import { Bank } from "@phosphor-icons/react";
import { useCreateBankAccountMutation } from "src/store/bank-account/slice";
import { Button } from "@components/UI/Button/Button.component";

type AddIbanModalProps = {
  visibleProp: boolean;
  closeModal: any;
};

const AddIbanModal = ({ visibleProp, closeModal }: AddIbanModalProps) => {
  const [visible, setVisible] = useState(visibleProp);
  const [iban, setiIban] = useState("");

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  const [createBankAccount, { isSuccess: isSuccessCreate }] =
    useCreateBankAccountMutation();

  const handleCreateBankAccount = () => {
    closeModal();
    createBankAccount({ iban });
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
        <Bank size={48} weight="bold" />
        <Spacer x={1} />
        <Text size={22} weight="bold">
          Ajouter un compte bancaire :
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          value={iban}
          onChange={(e) => setiIban(e.target.value)}
          placeholder="Iban"
          width="100%"
        />
        <Text
          size={12}
          color={colors.gray}
          css={{ pt: "$5", textAlign: "center" }}
        >
          *Veuillez entrer votre IBAN afin d'acheter des credits et que nous
          puissions vous versez vos gains
        </Text>
        <Spacer y={0.75} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={() => handleCreateBankAccount()}>
          Oui, je suis sûr !
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddIbanModal;
