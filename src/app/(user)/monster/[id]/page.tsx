"use client";

import MonsterCardCreate from "@components/MonsterCardDetails";
import { Button } from "@components/UI/Button/Button.component";
import Divider from "@components/UI/Divider";
import { Row, Spacer, Text, Col, Input } from "@nextui-org/react";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import {
  monsterType,
  weightCategories,
  convertApiTypeToType,
} from "src/utils/utils";
import { Select } from "antd";
import { applicationState } from "src/store/application/selector";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useUpdateMonsterMutation,
  useGetMonsterByIdQuery,
} from "src/store/monsters/slice";
import { useRouter } from "next/navigation";
import MonsterCardDetails from "@components/MonsterCardDetails/MonsterCardDetails";

export default function CreateMonster({ params }: { params: { id: number } }) {
  const router = useRouter();
  const id = Number(params.id);

  const { user } = useSelector(applicationState);

  const { data, refetch } = useGetMonsterByIdQuery(id);

  useEffect(() => {
    if (data) {
      console.log(data);
      setIdMonster(data.id);
      setName(data.name);
      setWeight(data.weight);
      setMonster_type(data.monster_type);
      setWeight_category(data.weight_category);
      setPicture(data.picture);
    }
  }, [data]);
  /**
   * STATE
   */
  const [idMonster, setIdMonster] = useState(-1);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [monster_type, setMonster_type] = useState("");
  const [weight_category, setWeight_category] = useState("");
  const [picture, setPicture] = useState<string | undefined>(undefined);
  const [newPicture, setNewPicture] = useState<string | undefined>(undefined);

  const monster = {
    name: name,
    weight: weight,
    monster_type: monster_type,
    weight_category: weight_category,
    picture: picture,
  };

  const pictureRef = React.useRef<HTMLInputElement>(null);
  const handleAddPicture = async (file: File) => {
    // Check if file is an image
    if (
      !file.type.includes("image") &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      toast.error("Votre photo n'est pas une image !");
    } else {
      setNewPicture(await toBase64(file));
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
  const [updateMonster] = useUpdateMonsterMutation();

  const handleAddMonster = async () => {
    updateMonster({
      id: idMonster,
      name,
      // mmr: MMR,
      weight,
      // @ts-ignore
      monster_type,
      // @ts-ignore
      weight_category,
      // @ts-ignore
      newPicture,
      fk_user: user.id ?? -1,
    });
    router.push("monster");
    refetch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formMonster}>
        <h1>Modification de {monster.name}</h1>
        <p>
          {
            "Faite combattre votre monstre, parier dessus, et gagner de l'argent"
          }
        </p>
        <Divider />
        <Input
          value={monster.name}
          onChange={(e) => setName(e.target.value)}
          label="Nom de votre monstre :"
          placeholder="Godzilla"
          fullWidth
        />
        <Spacer y={1.3} />
        <Input
          value={monster.weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          labelRight="KG"
          placeholder="500"
        />
        <Spacer y={1.3} />
        <Row>
          <Col>
            <Text>Type de votre monstre :</Text>
            <Select
              defaultValue={convertApiTypeToType(monster.monster_type)}
              style={{ width: 260 }}
              onChange={(e) => setMonster_type(e)}
              options={monsterType.map((type) => ({
                label: convertApiTypeToType(type),
                value: type,
              }))}
            />
          </Col>
          <Spacer x={1} />
          <Col>
            <Text>Categorie de votre monstre :</Text>
            <Select
              defaultValue={{ weight_category }}
              style={{ width: 300 }}
              onChange={(e) => setWeight_category(e)}
              options={weightCategories.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Col>
        </Row>
        <Spacer y={1.5} />
        <Text>Ajouter une image à votre monstre :</Text>
        <Spacer y={0.5} />
        <Button onPress={() => pictureRef.current?.click()}>
          {monster.picture ? "Changer l'image" : "Ajouter une image"}
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
        <Spacer y={1.5} />
        <Button analyticsId="createMonster-button" onPress={handleAddMonster}>
          Modifier votre monstre
        </Button>
        <Spacer y={3} />
      </div>
      <div className={styles.imgPanel}>
        {/* @ts-ignore */}
        <MonsterCardDetails monster={monster} />
      </div>
    </div>
  );
}
