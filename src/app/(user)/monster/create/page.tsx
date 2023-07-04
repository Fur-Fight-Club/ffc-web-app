"use client";

import MonsterCardCreate from "@components/MonsterCardDetails";
import { Button } from "@components/UI/Button/Button.component";
import { Col, Input, Row, Spacer, Text } from "@nextui-org/react";
import {
  convertApiTypeToType,
  convertWeightCategoryToLisibleString,
  monsterType,
  weightCategories,
} from "@utils/utils";
import React, { useState } from "react";

import { Select } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useCreateMonsterMutation } from "src/store/monsters/slice";

export default function CreateMonster() {
  const { user } = useSelector(applicationState);
  const router = useRouter();

  /**
   * STATE
   */
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [monster_type, setMonster_type] = useState("");
  const [weight_category, setWeight_category] = useState("");
  const [picture, setPicture] = useState<string | undefined>(
    "https://i.imgur.com/LGbVL6s.png"
  );

  const monster = {
    name: name,
    weight: weight,
    monster_type: monster_type,
    weight_category: weight_category,
    picture: picture,
  };

  const pictureRef = React.useRef<HTMLInputElement>(null);
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

  // Send monter to backend
  const [addMonster] = useCreateMonsterMutation();

  const handleAddMonster = async () => {
    if (name === "") {
      toast.error("Veuillez entrer un name");
      return;
    }

    if (weight === 0) {
      toast.error("Veuillez entrer un poids");
      return;
    }

    if (monster_type === "") {
      toast.error("Veuillez entrer un type");
      return;
    }

    if (weight_category === "") {
      toast.error("Veuillez entrer une categorie");
      return;
    }

    addMonster({
      name,
      weight,
      // @ts-ignore
      monster_type,
      // @ts-ignore
      weight_category,
      // @ts-ignore
      picture,
      fk_user: user.id ?? -1,
    }).then((res) => {
      router.push("monster");
    });
  };

  return (
    <div style={{ padding: "25px" }}>
      <Text h1>Créer votre monstre</Text>
      <Text>
        Faite combattre votre monstre, parier dessus, et gagner de l'argent
      </Text>

      <Spacer y={2.5} />

      <Col span={7}>
        <Row>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nom de votre monstre :"
            placeholder="Godzilla"
            width="70%"
          />
          <Spacer y={1.3} />
          <Input
            value={weight}
            label="Poids de votre monstre :"
            onChange={(e) => setWeight(Number(e.target.value))}
            labelRight="KG"
            placeholder="1000"
          />
        </Row>
        <Spacer y={1.3} />
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text>Type de votre monstre :</Text>
            <Select
              defaultValue="Choisir le type de votre monstre"
              style={{ width: 260 }}
              onChange={(e) => setMonster_type(e)}
              options={monsterType.map((type) => ({
                label: convertApiTypeToType(type),
                value: type,
              }))}
            />
          </div>

          <div>
            <Text>Catégorie de votre monstre :</Text>
            <Select
              defaultValue="Choisir la categorie de votre monstre"
              style={{ width: 300 }}
              onChange={(e) => setWeight_category(e)}
              value={convertWeightCategoryToLisibleString(weight_category)}
              options={weightCategories.map((type) => ({
                label: convertWeightCategoryToLisibleString(type),
                value: type,
              }))}
            />
          </div>
        </Row>
        <Spacer y={1.5} />
        <Text>Ajouter une image à votre monstre :</Text>
        <Spacer y={0.5} />
        <Button onPress={() => pictureRef.current?.click()}>
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
      </Col>

      <Col span={5} css={{ pl: "$15", height: "30rem" }}>
        <Text h3>Prévisualisation de votre monstre</Text>

        <MonsterCardCreate
          //@ts-ignore
          monster={
            monster.name == "" &&
            monster.weight == 0 &&
            monster.monster_type == "" &&
            monster.weight_category == ""
              ? null
              : monster
          }
        />
        <Spacer y={1} />
        <Button
          analyticsId="createMonster-button"
          onPress={handleAddMonster}
          css={{ width: "100%" }}
        >
          Créer le monstre !
        </Button>
      </Col>
    </div>
  );
}
