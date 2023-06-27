"use client";

import { Modal, Text, Image, Row } from "@nextui-org/react";
import { Button } from "@components/UI/Button/Button.component";
import { useEffect, useState } from "react";

type BuyTokenModalProps = {
  visibleProp: boolean;
  closeModal: any;
};

const BuyTokenModal = ({ visibleProp, closeModal }: BuyTokenModalProps) => {
  const [visible, setVisible] = useState(visibleProp);

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

  return (
    <Modal
      scroll
      width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={visible}
      css={{ p: "$20", pt: "$10", pb: "$15" }}
    >
      <Modal.Header>
        <Text size={"$5xl"}>Acheter des crédits</Text>
      </Modal.Header>
      <Modal.Body>
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
                console.log("buying " + coin.amount + " for " + coin.price)
              }
            >
              {`${coin.amount} 🪙 — ${coin.price}€`}
            </Button>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => closeModal()}>
          Close
        </Button>
        <Button auto onPress={() => closeModal()}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyTokenModal;
