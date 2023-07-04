"use client";

import colors from "@styles/_colors.module.scss";
import { useEffect, useState } from "react";
import { Input, Modal, Row, Spacer, Text } from "@nextui-org/react";
import { Bank } from "@phosphor-icons/react";
import { useWithdrawWalletMutation } from "src/store/wallet/slice";
import { Button } from "@components/UI/Button/Button.component";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "src/store/application/slice";

type WithdrawModalProps = {
  visibleProp: boolean;
  closeModal: any;
};

const WithdrawModal = ({ visibleProp, closeModal }: WithdrawModalProps) => {
  const router = useRouter();
  const [visible, setVisible] = useState(visibleProp);
  const [amount, setAmount] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  const [withdrawWallet, { isSuccess: isSuccessWithdraw }] =
    useWithdrawWalletMutation();
  const { refetch } = useGetUserQuery("");

  const handleWithdraw = () => {
    if (amount === 0) return;

    if (amount < 10000) {
      setErrorMessages("Le montant minimum est de 10.000 crédits");
      return;
    }

    withdrawWallet({ amount: +amount });

    refetch();
    router.push("/wallet");
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
        <Bank size={48} weight="bold" />
        <Spacer x={1} />
        <Text size={22} weight="bold">
          Retirer mes gains
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text size={18} color={colors.gray} css={{ textAlign: "center" }}>
          Veuillez entrer le nombre de crédits que vous souhaitez retirer (min.
          10.000 crédits)
        </Text>
        <Input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="10 000"
          labelRight="Crédits"
          width="100%"
        />
        <Text
          size={14}
          color={colors.primaryT100}
          css={{ textAlign: "center" }}
          weight={"light"}
        >
          {errorMessages?.length > 0 && errorMessages ? errorMessages : null}
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={() => handleWithdraw()}>
          Oui, je suis sûr !
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawModal;
