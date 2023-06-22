"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MonsterCardCreate from "@components/MonsterCardCreate";
import { Button } from "@components/UI/Button/Button.component";
import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Dropdown, Row, Spacer, Text, Col } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  CreateMonsterType,
  createMonsterSchema,
} from "src/model/monster.schema";
import styles from "./page.module.scss";
import React, { useMemo, useState } from "react";
import {
  monsterType,
  weightCategories,
  convertApiTypeToType,
} from "../../utils";
import type { UploadProps } from "antd";
import { Button as AntButton, message, Upload } from "antd";
import { resolve } from "path";

export default function CreateMonster() {
  const [file, setFile] = useState({});
  const [selectedMonsterType, setSelectedMonsterType] = useState("");
  const [selectedWeightCategory, setSelectedWeightCategory] = useState("");
  const selectedType = useMemo(
    () => Array.from(selectedMonsterType).join(", ").replaceAll("_", " "),
    [selectedMonsterType]
  );
  const selectedWeight = useMemo(
    () => Array.from(selectedWeightCategory).join(", ").replaceAll("_", " "),
    [selectedWeightCategory]
  );

  const props: UploadProps = {
    onChange(info) {
      setFile(info);
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateMonsterType>();

  const monster = {
    name: watch("name"),
    weight: watch("weight"),
    monster_type:
      selectedMonsterType == "Choisir le type de votre monstre"
        ? undefined
        : selectedMonsterType,
    weight_category:
      selectedWeightCategory == "Choisir la catégorie de poids du monstre"
        ? undefined
        : selectedWeightCategory,
  };

  const onSubmit = (data: CreateMonsterType) => {
    data.monster_type = selectedMonsterType.anchorKey;
    data.weight_category = selectedWeightCategory.anchorKey;
    data.weight = Number(data.weight);
    if (
      !data.name ||
      selectedMonsterType.anchorKey === "Choisir le type de votre monstre" ||
      selectedWeightCategory.anchorKey ===
        "Choisir la catégorie de poids du monstre" ||
      !monster.weight
    ) {
      console.log("Error");
    }
    console.log(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formMonster}>
        <h1>Créer votre monstre</h1>
        <p>
          {
            "Faite combattre votre monstre, parier dessus, et gagner de l'argent"
          }
        </p>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Nom de votre monstre :"
            placeholder="Godzilla"
            register={register("name")}
            errorMessage={errors.name?.message}
            fullWidth
          />
          <Spacer y={1.3} />
          <Input
            label="Poids de votre monstre :"
            type="number"
            placeholder="500"
            register={register("weight")}
            errorMessage={errors.weight?.message}
          />
          <Spacer y={1.3} />
          <Row>
            <Col>
              <Text>Type de votre monstre :</Text>
              <Dropdown>
                <Dropdown.Button flat color="default">
                  {selectedType === ""
                    ? "Choisir le type de votre monstre"
                    : convertApiTypeToType(selectedType)}
                </Dropdown.Button>
                <Dropdown.Menu
                  register={register("monster_type")}
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedMonsterType}
                  onSelectionChange={setSelectedMonsterType}
                  errorMessage={errors.monster_type?.message}
                  items={monsterType.map((type) => ({
                    label: convertApiTypeToType(type),
                    value: type,
                  }))}
                >
                  {(type) => (
                    <Dropdown.Item key={type.value}>{type.label}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Spacer x={1} />
            <Col>
              <Text>Categorie de votre monstre :</Text>
              <Dropdown>
                <Dropdown.Button flat color="default">
                  {selectedWeight === ""
                    ? "Choisir la categorie de votre monstre"
                    : selectedWeight}
                </Dropdown.Button>
                <Dropdown.Menu
                  register={register("weight_category")}
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedWeightCategory}
                  onSelectionChange={setSelectedWeightCategory}
                  errorMessage={errors.weight_category?.message}
                  items={weightCategories.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                >
                  {(type) => (
                    <Dropdown.Item key={type.value}>{type.label}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Spacer y={1.5} />
          <Text>Ajouter une image à votre monstre :</Text>
          <Upload {...props}>
            <AntButton>Click to Upload</AntButton>
          </Upload>
          <Spacer y={1.5} />
          <Button type="submit" analyticsId="register-button">
            {"Créer votre monstre"}
          </Button>
        </form>
        <Spacer y={3} />
      </div>
      <div className={styles.imgPanel}>
        <MonsterCardCreate monster={monster} />
      </div>
    </div>
  );
}
