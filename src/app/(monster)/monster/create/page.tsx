"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MonsterCardCreate from "@components/MonsterCardCreate";
import { Button } from "@components/UI/Button/Button.component";
import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Dropdown, Row, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterType, registerSchema } from "src/model/user.schema";
import { useRegisterMutation } from "src/store/application/slice";
import styles from "./page.module.scss";
import React, { useMemo, useState } from "react";
import {
  monsterType,
  weightCategories,
  convertApiTypeToType,
} from "../../utils";

export default function Home() {
  const [selectedMonsterType, setSelectedMonsterType] = useState(
    new Set(["Choisir le type du monstre"])
  );
  const [selectedWeightCategory, setSelectedWeightCategory] = useState(
    new Set(["Choisir la catégorie de poids du monstre"])
  );

  const selectedType = useMemo(
    () => Array.from(selectedMonsterType).join(", ").replaceAll("_", " "),
    [selectedMonsterType]
  );
  const selectedWeight = useMemo(
    () => Array.from(selectedWeightCategory).join(", ").replaceAll("_", " "),
    [selectedWeightCategory]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  const [registerMutation, { data: registerData }] = useRegisterMutation();

  console.log(process.env.NEXT_PUBLIC_ENDPOINT);

  const onSubmit = (data: RegisterType) => {
    console.log("submit", data);

    registerMutation(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formMonster}>
        <h1>Créer votre monster</h1>
        <p>
          {
            "Faite combattre votre monstre, parier dessus, et gagner de l'argent"
          }
        </p>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Nom de votre nomstre :"
            placeholder="Godzilla"
            register={register("firstname")}
            errorMessage={errors.firstname?.message}
            fullWidth
          />
          <Spacer y={1.3} />
          <Input
            label="Poids de votre monstre :"
            placeholder="500"
            register={register("email")}
            errorMessage={errors.email?.message}
          />
          <Spacer y={1.3} />
          <Text>Type de votre monstre :</Text>
          <Dropdown>
            <Dropdown.Button flat color="default">
              {selectedType}
            </Dropdown.Button>
            <Dropdown.Menu
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedMonsterType}
              onSelectionChange={setSelectedMonsterType}
              items={monsterType.map((type) => ({
                label: type,
                value: type,
              }))}
            >
              {(type) => (
                <Dropdown.Item key={type.value}>{type.label}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Spacer y={1.3} />
          <Text>Categorie de votre monstre :</Text>
          <Dropdown>
            <Dropdown.Button flat color="default">
              {selectedWeight}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedWeightCategory}
              onSelectionChange={setSelectedWeightCategory}
              items={weightCategories.map((type) => ({
                label: convertApiTypeToType(type),
                value: type,
              }))}
            >
              {(type) => (
                <Dropdown.Item key={type.value}>{type.label}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Spacer y={1.5} />
          <Button type="submit" analyticsId="register-button">
            {"Créer votre monstre"}
          </Button>
        </form>
        <Spacer y={3} />
      </div>
      <div className={styles.imgPanel}>
        <MonsterCardCreate />
      </div>
    </div>
  );
}
