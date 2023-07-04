"use client";

import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { convertApiTypeToType } from "@utils/utils";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";
import { walletState } from "src/store/wallet/selector";

type Step4Props = {};

const Step4 = (props: Step4Props) => {
  const dispatch = useDispatch();

  const { monster, step, arena, bet, date } = useSelector(createMatchFormState);
  const { user } = useSelector(applicationState);
  const { credits } = useSelector(walletState);

  const canCreateMatch = () => {
    if (!monster || !arena || !bet || !date) {
      toast.error("Une erreur est survenue. Veuillez recommencer.");
      return false;
    }

    if (bet > credits) {
      toast.error(
        "Vous ne pouvez pas miser plus que ce que vous avez sur votre compte"
      );
      return false;
    }

    if (bet < 100) {
      toast.error("Vous devez miser au moins 100 jetons");
      return false;
    }

    return true;
  };

  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    if (!canCreateMatch()) return;

    setVisible(false);
    dispatch(setStepCreateForm(4));
  };
  const openHandler = useCallback(() => setVisible(true), []);

  const handleStepBack = () => {
    dispatch(setStepCreateForm(2));
  };

  const hasStripeAccount =
    // @ts-ignore
    !user?.StripeAccount || !user?.StripeBankAccount;

  useEffect(() => {
    if (hasStripeAccount) {
      toast.error("Vous devez avoir un compte Stripe pour créer un match");
    }
  }, [hasStripeAccount]);

  return (
    <>
      <div style={{ height: "80vh" }}>
        <Spacer y={1} />
        <Text b size={"$3xl"}>
          {"Récapitulatif"}
        </Text>
        <Col>
          <Spacer y={1} />
          <Text b size={"$1xl"}>
            1 - Monstre
          </Text>
          <Spacer y={0.5} />
          <Card css={{ padding: "1rem" }}>
            <Col>
              <Text>Nom : {monster?.name}</Text>
              <Text>MMR : {monster?.mmr}</Text>
              <Text>Poids : {monster?.weight}</Text>
              <Text>Category : {monster?.weight_category}</Text>
              {/* @ts-ignore */}
              <Text>Type : {convertApiTypeToType(monster?.monster_type)}</Text>
            </Col>
          </Card>
          <Spacer y={1} />
          <Text b size={"$1xl"}>
            2 - Arène
          </Text>
          <Spacer y={0.5} />
          <Card css={{ padding: "1rem" }}>
            <Col>
              <Text>Nom : {arena?.name}</Text>
              <Text>
                Adresse : {arena?.address}, {arena?.zipcode} {arena?.city},{" "}
                {arena?.country}
              </Text>
              {/* @ts-ignore */}
              <Text>Date : {date}</Text>
            </Col>
          </Card>
          <Spacer y={1} />
          <Text b size={"$1xl"}>
            3 - Mise
          </Text>
          <Spacer y={0.5} />
          <Card css={{ padding: "1rem" }}>
            <Col>
              <Text>Mise : {bet}</Text>
            </Col>
          </Card>
        </Col>
        <Row justify="flex-end">
          <Button bordered onClick={handleStepBack}>
            Retour
          </Button>
          <Spacer x={0.5} />
          <Button onClick={openHandler}>Suivant</Button>
        </Row>
      </div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Col>
            <Text b size={18}>
              Attention
            </Text>
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={1} />
            <Text css={{ textAlign: "left" }} size={16}>
              Vous vous apprétez à miser{" "}
              <Text b css={{ textAlign: "left" }} size={16}>
                {bet} jetons
              </Text>{" "}
              pour créer votre match.
            </Text>
            <Spacer y={0.5} />
            <Text css={{ textAlign: "left" }} size={16}>
              Une fois le match créé, un autre adversaire pourra le rejoindre et
              suivre votre mise. A la fin du match, le gagnant remportera la
              mise du perdant.
            </Text>
            <Spacer y={0.5} />
            <Text css={{ textAlign: "left" }} size={16}>
              Voulez-vous continuer ?
            </Text>
            <Text css={{ textAlign: "left" }} size={16}>
              Cette action est{" "}
              <Text b css={{ textAlign: "left" }} size={16}>
                irréversible.
              </Text>
            </Text>
          </Col>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fermer
          </Button>
          <Button auto onPress={closeHandler}>
            Confirmer le paiement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Step4;
