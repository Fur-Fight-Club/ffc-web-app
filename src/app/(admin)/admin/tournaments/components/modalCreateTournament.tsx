"use client";

import { useRef, useState } from "react";
import { Button } from "@components/UI/Button/Button.component";
import Input from "@components/UI/Input";
import { Modal, Spacer, Text } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useCreateTournamentMutation } from "src/store/tournament/slice";
import { Select } from "antd";
import { useGetArenasQuery } from "src/store/arenas/slice";

export const ModalCreateTournament = (props: {
  visible: boolean;
  closeHandler: () => void;
  refetch: () => void;
}) => {
  const { visible, closeHandler, refetch } = props;
  const pictureRef = useRef<HTMLInputElement>(null);

  const [tournamentMutation, { data }] = useCreateTournamentMutation();

  const [name, setName] = useState<string>("");
  const [arenaId, setArenaId] = useState<string>("-1");
  const [entryCost, setEntryCost] = useState<number>(1000);

  const { data: arenas, refetch: refetchArenas } = useGetArenasQuery();

  const validForm = () => {
    if (name === "") {
      toast.error("Le nom du tournoi est obligatoire");
      return;
    }

    if (arenaId === "-1") {
      toast.error("Veuillez selectionner une arene");
      return;
    }

    if (entryCost < 1000) {
      toast.error("Veuillez mettre un cout d'entrée supérieur à 1000");
      return;
    }

    return true;
  };

  const handleSubmitForm = () => {
    if (validForm()) {
      tournamentMutation({
        name,
        arena_id: +arenaId,
        entry_cost: entryCost,
      }).then(() => {
        refetch();
        refetchArenas();
        closeHandler();
      });
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Creer un tournoi
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Nom du tournoi :"
          placeholder="Tournoi de la mort"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Spacer y={0.2} />
        <Text>Selectionnez l'arene</Text>
        <Select
          showSearch
          placeholder="Selectionner une arene"
          optionFilterProp="children"
          size="large"
          onChange={(e) => setArenaId(e)}
          dropdownStyle={{ zIndex: 9999 }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={arenas?.map((a) => ({
            value: a.id,
            label: a.name,
          }))}
        />
        <Spacer y={0.2} />

        <Input
          label="Frais de participation :"
          placeholder="1000"
          value={entryCost}
          onChange={(e) => setEntryCost(+e.target.value)}
          fullWidth
        />
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
        <Button auto analyticsId="save-moda-account" onPress={handleSubmitForm}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
