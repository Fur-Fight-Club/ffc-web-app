"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Arena } from "src/store/arenas/arenas.model";
import { useCreateArenaMutation } from "src/store/arenas/slice";

import { Button } from "@components/UI/Button/Button.component";
import Input from "@components/UI/Input";
import { Modal, Spacer, Text } from "@nextui-org/react";
import { CreateArenaType, createArenaSchema } from "src/model/arena.schema";

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
  } = useForm<CreateArenaType>({ resolver: zodResolver(createArenaSchema) });

  const { visible, closeHandler, refetch } = props;

  const [selectedAddress, setSelectedAddress] = useState("");
  const [arenaMutation, { data }] = useCreateArenaMutation();

  const onSubmit = (data: Arena) => {
    arenaMutation(data).then(() => {
      refetch();
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
            register={register("name")}
            fullWidth
            errorMessage={errors.name?.message}
          />

          <Spacer y={0.2} />
          <Input
            label="Adresse:"
            placeholder="9 allée des mimosas"
            register={register("address")}
            errorMessage={errors.address?.message}
            fullWidth
          />

          <Spacer y={0.2} />
          <Input
            label="Ville:"
            placeholder="Paris"
            register={register("city")}
            errorMessage={errors.city?.message}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Zipcode:"
            placeholder="75002"
            register={register("zipcode")}
            errorMessage={errors.zipcode?.message}
            fullWidth
          />
          <Spacer y={0.2} />
          <Input
            label="Pays:"
            placeholder="France"
            register={register("country")}
            errorMessage={errors.country?.message}
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
