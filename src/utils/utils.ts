import { User } from "src/store/application/application.model";

export const parseWheightCategory = (weight: string) => {
  //'A_HECKING_CHONKER' => 'A HECKING CHONKER'
  const weightCategory = weight.split("_").join(" ");
  const weightCategoryCapitalized = weightCategory
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return weightCategoryCapitalized;
};

// Function that generate x random rgba colors at 1 and .2 opacity
export const generateRandomColors = (x: number) => {
  const colors = [];
  for (let i = 0; i < x; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    colors.push([`rgba(${r},${g},${b},1)`, `rgba(${r},${g},${b},.2)`]);
  }
  return colors;
};

export const isUserLoggedIn = (user: User) => {
  if (user?.role) {
    return (
      user?.role.includes("USER") ||
      user?.role.includes("ADMIN") ||
      user?.role.includes("MONSTER_OWNER")
    );
  }
  return false;
};

export const isUserAdmin = (user: User) => {
  if (user?.role) {
    return user?.role.includes("ADMIN");
  }
  return false;
};

export const getInitials = (firstName: string, lastName: string) => {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

import colors from '@styles/_colors.module.scss';

export const convertApiTypeToLogo = (
  apiType: Monster["monster_type"] | string
) => {
  switch (apiType) {
    case "ELEMENTARY":
      return "🌋";
    case "FANTASTIC":
      return "🦄";
    case "MYTHOLOGICAL":
      return "🏛️";
    case "SCARY":
      return "👻";
    case "AQUATIC":
      return "🌊";
    case "WINGED":
      return "🪽";
    case "PREHISTORIC":
      return "🦖";
    case "MECHANICAL":
      return "⚙️";
    case "EXTRATERRESTRIAL":
      return "🛸";
    case "MAGICAL":
      return "🪄";
    default:
      return "❓";
  }
};

export const convertApiTypeToType = (
  apiType: Monster["monster_type"] | string
) => {
  switch (apiType) {
    case "ELEMENTARY":
      return "🌋 Élémentaire";
    case "FANTASTIC":
      return "🦄 Fantastique";
    case "MYTHOLOGICAL":
      return "🏛️ Mythologique";
    case "SCARY":
      return "👻 Effrayant";
    case "AQUATIC":
      return "🌊 Aquatique";
    case "WINGED":
      return "🪽 Ailé";
    case "PREHISTORIC":
      return "🦖 Préhistorique";
    case "MECHANICAL":
      return "⚙️ Mécanique";
    case "EXTRATERRESTRIAL":
      return "🛸 Extraterrestre";
    case "MAGICAL":
      return "🪄 Magique";
    default:
      return "❓ Inconnu";
  }
};

export const weightCategories = [
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
];


export const monsterType = [
  "ELEMENTARY",
  "FANTASTIC",
  "MYTHOLOGICAL",
  "SCARY",
  "AQUATIC",
  "WINGED",
  "PREHISTORIC",
  "MECHANICAL",
  "EXTRATERRESTRIAL",
  "MAGICAL",
];

export const weightCategoryColors = (weightCategory: WeightCategoryType) => {
  switch (weightCategory) {
    case "A_FINE_BOI":
      return colors.primaryT500;
    case "HE_CHOMNK":
      return colors.primaryT400;
    case "A_HECKING_CHONKER":
      return colors.primaryT300;
    case "HEFTY_CHONK":
      return colors.primaryT200;
    case "MEGA_CHONKER":
      return colors.primaryT100;
    case "OH_LAWD_HE_COMIN":
      return colors.black;
    default:
      return colors.primary;
  }
};