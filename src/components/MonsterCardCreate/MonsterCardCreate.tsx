import { mergeClassNames } from "src/utils/main";
import styles from "./MonsterCardCreate.module.scss";
import React, { useEffect, useState } from "react";
import {
  monsterType as monsterTypeEnum,
  convertApiTypeToType,
  weightCategories,
  convertApiTypeToLogo,
} from "./utils";
import Lottie from "lottie-react";
import monsterAnimation1 from "@assets/animations/monster/monster_default_1.json";
import monsterAnimation2 from "@assets/animations/monster/monster_default_2.json";
import monsterAnimation3 from "@assets/animations/monster/monster_default_3.json";
import monsterAnimation4 from "@assets/animations/monster/monster_default_4.json";
import { Image, Text } from "@nextui-org/react";

type MonsterCardCreateProps = {
  className?: string;
  monster?: any;
};

const MonsterCardCreate = ({ className, monster }: MonsterCardCreateProps) => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [monsterType, setMonsterType] = useState("");
  const [logoMonsterType, setLogoMonsterType] = useState("");
  const [weightCategory, setWeightCategory] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureAnimation, setPictureAnimation] = useState("");

  useEffect(() => {
    if (monster) {
      if (monster.name) setName(monster.name);
      if (monster.weight) setWeight(monster.weight);
      if (monster.monster_type) {
        setMonsterType(convertApiTypeToType(monster.monster_type));
      }
      if (monster.monster_type)
        setLogoMonsterType(
          convertApiTypeToLogo(monster.monster_type.anchorKey)
        );
      if (monster.weight_category) setWeightCategory(monster.weight_category);
      if (monster.picture) setPicture(monster.picture);
    }
  }, [monster]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!monster || !monster.name) {
        setName(generateRandomName());
      }
      if (!monster || !monster.weight) {
        setWeight(generateRandomWeight());
      }
      if (!monster || !monster.weight_category) {
        setWeightCategory(generateRandomWeightCategory());
      }
      if (!monster || !monster.monster_type) {
        setMonsterType(generateRandomMonsterType());
      }
      if (!monster || !monster.picture) {
        setPictureAnimation(generateRandomPicture());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [monster]);

  const generateRandomName = () => {
    const names = [
      "Vaporcat",
      "Embertalon",
      "Brineword",
      "Abyssface",
      "Germling",
      "Cursefigure",
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateRandomWeight = () => {
    const roundedWeight = Math.random() * (1000000 - 1) + 1;
    return roundedWeight.toFixed(2);
  };

  const generateRandomMonsterType = () => {
    const randomIndex = Math.floor(Math.random() * monsterTypeEnum.length);
    setLogoMonsterType(convertApiTypeToLogo(monsterTypeEnum[randomIndex]));
    return convertApiTypeToType(monsterTypeEnum[randomIndex]);
  };

  const generateRandomWeightCategory = () => {
    const randomIndex = Math.floor(Math.random() * weightCategories.length);
    return weightCategories[randomIndex];
  };

  const generateRandomPicture = () => {
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    let monsterAnimation;
    switch (randomIndex) {
      case 1:
        monsterAnimation = monsterAnimation1;
        break;
      case 2:
        monsterAnimation = monsterAnimation2;
        break;
      case 3:
        monsterAnimation = monsterAnimation3;
        break;
      case 4:
        monsterAnimation = monsterAnimation4;
        break;
      default:
        monsterAnimation = monsterAnimation1;
        break;
    }

    return monsterAnimation;
  };

  return (
    <div className={mergeClassNames([styles.MonsterCardCreate, className])}>
      <div className={styles.monsterCard}>
        <div className={styles.top}>
          <div className={styles.name}>{name}</div>
          <div className={styles.typeLogo}>
            <span className={styles.weight}>{weight}</span> {logoMonsterType}
          </div>
        </div>
        <div className={styles.picture}>
          {picture ? (
            <Image src={picture} alt="Default Image" objectFit="cover" />
          ) : (
            <Lottie
              className={styles.lottie}
              animationData={pictureAnimation}
            />
          )}
        </div>
        <div className={styles.characteristic}>{monsterType}</div>
        <div className={styles.characteristic}>{weightCategory}</div>
        <div className={styles.characteristic}>💪🏿 : {weight}</div>
      </div>
    </div>
  );
};

export default MonsterCardCreate;
