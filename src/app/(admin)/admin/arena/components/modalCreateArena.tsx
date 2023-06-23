"use client";

import { Button } from "@components/UI/Button/Button.component";
import Input from "@components/UI/Input";
import { Modal, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Arena } from "src/store/arenas/arenas.model";
import { useCreateArenaMutation } from "src/store/arenas/slice";

export const ModalCreateArena = (props: {
  visible: boolean;
  closeHandler: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Arena>();

  const { visible, closeHandler } = props;

  const [selectedAddress, setSelectedAddress] = useState("");

  const [arenaMutation, { data }] = useCreateArenaMutation();

  const onSubmit = (data: Arena) => {
    arenaMutation(data);
    closeHandler();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Ajouter une arène
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Nom de l'arène :"
            placeholder="Chez momo"
            register={register("name")}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Adresse:"
            placeholder="9 allée des mimosas"
            register={register("address")}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Ville:"
            placeholder="Paris"
            register={register("city")}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Zipcode:"
            placeholder="75002"
            register={register("zipcode")}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Pays:"
            placeholder="France"
            register={register("country")}
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
          <Button auto analyticsId="save-moda-account" type="submit">
            Sauvegarder
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
