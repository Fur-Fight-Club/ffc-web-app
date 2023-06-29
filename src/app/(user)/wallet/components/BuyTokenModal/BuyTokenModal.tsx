"use client";

import { Modal, Text, Image, Row } from "@nextui-org/react";
import { Button } from "@components/UI/Button/Button.component";
import { useEffect, useState } from "react";
import { BuyCreditsRequest } from "./utils";
import styles from "./BuyTokenModal.module.scss";
import { useBuyCreditsMutation } from "src/store/wallet/slice";

type BuyTokenModalProps = {
  visibleProp: boolean;
  closeModal: any;
};

const BuyTokenModal = ({ visibleProp, closeModal }: BuyTokenModalProps) => {
  const [visible, setVisible] = useState(visibleProp);
  const [displayValidation, setDisplayValidation] = useState("block");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(0);
  const [disabledValidation, setDisabledValidation] = useState(true);

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  const coins = [
    { image: require("@assets/images/coins/1.png"), amount: "475", price: 5 },
    { image: require("@assets/images/coins/2.png"), amount: "1000", price: 10 },
    { image: require("@assets/images/coins/3.png"), amount: "2050", price: 20 },
    { image: require("@assets/images/coins/4.png"), amount: "3650", price: 35 },
    { image: require("@assets/images/coins/5.png"), amount: "5350", price: 50 },
    {
      image: require("@assets/images/coins/6.png"),
      amount: "11000",
      price: 100,
    },
  ];

  const handleBuyCredit = (
    amount: BuyCreditsRequest["credits"],
    price: any
  ) => {
    setAmount(amount);
    setPrice(price);
    setDisplayValidation("none");
    setDisabledValidation(false);
  };

  const handleback = () => {
    setDisplayValidation("block");
    if (displayValidation == "block") closeModal();
  };

  const [buyCredit] = useBuyCreditsMutation();

  const handleBuy = () => {
    // @ts-ignore
    buyCredit({ credits: amount });
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
        <Text size={"$4xl"}>🛒 Acheter des crédits</Text>
      </Modal.Header>
      <Modal.Body>
        <Row css={{ display: displayValidation == "block" ? "none" : "block" }}>
          <Text size={"$2xl"} css={{ textAlign: "center" }}>
            Voulez-vous vraiment acheter{" "}
            <span className={styles.price}>{amount}</span> crédits pour{" "}
            <span className={styles.price}>{price} </span>€ ?
          </Text>
        </Row>
        <Row css={{ display: displayValidation }}>
          {coins.map((coin, index) => (
            <Row key={index} justify="space-between" align="center">
              <Image
                src={coin.image.default.src}
                alt="coins"
                width={60}
                height={60}
              />
              <Button
                style={{ width: "50%" }}
                color="warning"
                onPress={() =>
                  handleBuyCredit(
                    coin.amount as BuyCreditsRequest["credits"],
                    coin.price
                  )
                }
              >
                {`${coin.amount} 🪙 — ${coin.price}€`}
              </Button>
            </Row>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => handleback()}>
          Annuler
        </Button>
        <Button disabled={disabledValidation} auto onPress={() => handleBuy()}>
          Oui, je suis sûr !
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyTokenModal;
