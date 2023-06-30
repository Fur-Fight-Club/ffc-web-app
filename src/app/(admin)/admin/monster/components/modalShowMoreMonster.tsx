"use client";

import { useRef, useState } from "react";
import { useCreateArenaMutation } from "src/store/arenas/slice";

import { Button } from "@components/UI/Button/Button.component";
import Input from "@components/UI/Input";
import { Modal, Spacer, Text } from "@nextui-org/react";
import toast from "react-hot-toast";

export const ModalShowMoreMonster = (props: {
  visible: boolean;
  closeHandler: any;
}) => {
  const { visible, closeHandler } = props;
  const pictureRef = useRef<HTMLInputElement>(null);

  const [arenaMutation, { data }] = useCreateArenaMutation();

  const [name, setName] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [zipcode, setZipcode] = useState<string | undefined>();
  const [country, setCountry] = useState<string | undefined>();
  const [picture, setPicture] = useState<string | undefined>(undefined);

  const handleAddPicture = async (file: File) => {
    if (
      !file.type.includes("image") &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      toast.error("Votre photo n'est pas une image !");
    } else {
      setPicture(await toBase64(file));
      toast.success(`Votre photo  "${file.name}" est prêt a être envoyé`);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // When the file is loaded
      reader.onload = () => resolve(reader.result as string);
      // If an error occured
      reader.onerror = (error) => reject(error);
    });

  const validForm = () => {
    if (name === "") {
      toast.error("Le nom de l'arène est obligatoire");
      return;
    }

    if (address === "") {
      toast.error("L'adresse de l'arène est obligatoire");
      return;
    }

    if (city === "") {
      toast.error("La ville de l'arène est obligatoire");
      return;
    }

    if (zipcode === "") {
      toast.error("Le code postal de l'arène est obligatoire");
      return;
    }

    if (country === "") {
      toast.error("Le pays de l'arène est obligatoire");
      return;
    }

    return true;
  };

  const handleSubmitForm = () => {
    if (validForm()) {
      arenaMutation({
        name: name,
        address: address,
        city: city,
        zipcode: zipcode,
        country: country,
        picture: picture,
      }).then(() => {
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
          Ajouter une arène
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Nom de l'arène :"
          placeholder="Chez momo"
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Spacer y={0.2} />
        <Input
          label="Adresse:"
          placeholder="9 allée des mimosas"
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />

        <Spacer y={0.2} />
        <Input
          label="Ville:"
          placeholder="Paris"
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <Spacer y={0.2} />
        <Input
          label="Zipcode:"
          placeholder="75002"
          onChange={(e) => setZipcode(e.target.value)}
          fullWidth
        />
        <Spacer y={0.2} />
        <Input
          label="Pays:"
          placeholder="France"
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
        />

        <Spacer y={0.2} />
        <Button auto flat onPress={() => pictureRef.current?.click()}>
          {picture ? "Changer l'image" : "Ajouter une image"}
        </Button>
        <input
          type="file"
          ref={pictureRef}
          style={{
            display: "none",
          }}
          onChange={async (e) => {
            if (e.target.files) {
              handleAddPicture(e.target.files[0]);
            }
          }}
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
export type first = { second };
