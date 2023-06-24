"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Arena } from "src/store/arenas/arenas.model";
import { useCreateArenaMutation } from "src/store/arenas/slice";

import { Button } from "@components/UI/Button/Button.component";
import Input from "@components/UI/Input";
import { Modal, Spacer, Text } from "@nextui-org/react";

export const ModalCreateArena = (props: {
  visible: boolean;
  closeHandler: any;
  refetch: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Arena>();

  console.log(errors);

  const { visible, closeHandler, refetch } = props;

  const [selectedAddress, setSelectedAddress] = useState("");
  const [arenaMutation, { data }] = useCreateArenaMutation();

  const onSubmit = (data: Arena) => {
    arenaMutation(data).then(() => {
      refetch(); // Appeler refetch après la mutation
      closeHandler();
    });
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
            register={register("name", {
              required: "Le nom de l'arène est requis",
              minLength: {
                value: 3,
                message:
                  "Le nom de l'arène doit contenir au moins 3 caractères",
              },
              maxLength: {
                value: 50,
                message: "Le nom de l'arène ne peut pas dépasser 50 caractères",
              },
            })}
            fullWidth
          />

          {errors.name && <span>{errors.name.message}</span>}

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
