import { Monster, WeightCategoryType } from "src/model/monster.schema";

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

export const weightCategories = [
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
];

export const addDotEveryThreeDigits = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
