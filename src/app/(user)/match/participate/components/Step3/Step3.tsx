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
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useGetUserQuery } from "src/store/application/slice";
import { joinMatchFormState, matchesState } from "src/store/matches/selector";
import { setStepJoinForm, useGetMatchesQuery } from "src/store/matches/slice";
import { walletState } from "src/store/wallet/selector";

type Step3Props = {};

const Step3 = (props: Step3Props) => {
  const dispatch = useDispatch();

  const { monster, match } = useSelector(joinMatchFormState);
  const { user } = useSelector(applicationState);
  const { credits } = useSelector(walletState);
  const { matches } = useSelector(matchesState);
  const { refetch } = useGetMatchesQuery();
  const { refetch: userRefetch } = useGetUserQuery("");
  // const [createMatchMutation, { data, isError, isLoading, error }] =
  //   useCreateMatchMutation();

  const canCreateMatch = () => {
    if (!monster || !match) {
      toast.error("Une erreur est survenue. Veuillez recommencer.");
      return false;
    }

    // @ts-ignore
    if (!user?.StripeAccount || !user?.StripeBankAccount) {
      toast.error("Vous devez avoir enregistré un compte bancaire pour miser");
      return false;
    }

    if (match?.entryCost > credits) {
      toast.error(
        "Vous ne pouvez pas miser plus que ce que vous avez sur votre compte"
      );
      return false;
    }

    if (match?.fk_monster_2 === monster?.id) {
      toast.error("Vous ne pouvez pas vous battre contre vous même");
      return false;
    }

    if (!match?.entryCost) {
      toast.error(
        "Une erreur est survenue. Aucune mise n'a été définie pour ce match. Veuillez sélectionner un autre match."
      );
      return false;
    }

    // if (match?.entryCost < 100) {
    //   toast.error("Vous devez miser au moins 100 jetons");
    //   return false;
    // }

    // if (!checkMonsterAlreadyHaveMatchAroundDate()) {
    //   toast.error(
    //     "Ce monstre a déjà un match de prévu à cette date. Un match dure environ 5 minutes (performance, arbitrage...). Veuillez choisir une autre date."
    //   );
    //   return false;
    // }

    return true;
  };

  const [visible, setVisible] = useState(false);

  const ConfirmPaymentHandler = async () => {
    if (!canCreateMatch()) {
      closeModaleHandler();
      return;
    }

    if (!monster || !match) return;

    // await createMatchMutation({
    // monster1: monster.id,
    // weight_category: monster.weight_category,
    // fk_arena: arena.id,
    // matchStartDate: new Date(date),
    // entry_cost: bet,
    // });

    // if (isError) {
    // toast.error(
    // "Une erreur est survenue durant la création de match. Veuillez recommencer."
    // );
    // return;
    // }

    setVisible(false);
    toast.success("OK POUR LA REQUETE");
    // dispatch(setStepJoinForm(1));
  };

  const closeModaleHandler = useCallback(() => setVisible(false), []);

  const openModaleHandler = useCallback(() => setVisible(true), []);

  const handleStepBack = () => {
    dispatch(setStepJoinForm(1));
  };

  const hasStripeAccount =
    // @ts-ignore
    !user?.StripeAccount || !user?.StripeBankAccount;

  useEffect(() => {
    refetch();
    userRefetch();
  }, []);

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
            1 - Votre Monstre
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
              <Text>Nom : {match?.Arena?.name}</Text>
              <Text>
                Adresse : {match?.Arena?.address}, {match?.Arena?.zipcode}{" "}
                {match?.Arena?.city}, {match?.Arena?.country}
              </Text>
              {/* @ts-ignore */}
              <Text>
                {/* @ts-ignore */}
                Date : {/* @ts-ignore */}
                {format(new Date(match?.matchStartDate), "dd/MM/yyyy", {
                  locale: fr,
                })}
              </Text>
            </Col>
          </Card>
          <Spacer y={1} />
          <Text b size={"$1xl"}>
            3 - Mise
          </Text>
          <Spacer y={0.5} />
          <Card css={{ padding: "1rem" }}>
            <Col>
              <Text>Mise : {match?.entryCost ?? "0"} jetons</Text>
            </Col>
          </Card>
        </Col>
        <Row justify="flex-end">
          <Button bordered onClick={handleStepBack}>
            Retour
          </Button>
          <Spacer x={0.5} />
          <Button onClick={openModaleHandler}>Suivant</Button>
        </Row>
      </div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModaleHandler}
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
                {match?.entryCost} jetons
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
          <Button auto flat color="error" onPress={closeModaleHandler}>
            Fermer
          </Button>
          <Button auto onPress={ConfirmPaymentHandler}>
            Confirmer le paiement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Step3;
