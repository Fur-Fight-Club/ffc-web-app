import { User as UserModel } from "ffc-prisma-package/dist/client";
import { User } from "src/store/application/application.model";
import { Monster, WeightCategoryType } from "src/store/monsters/monsters.model";

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

export const convertApiTypeToLogoOnly = (
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

export const weightCategories = [
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
];

export const convertWeightCategoryToLisibleString = (
  weightCategories: string
) => {
  switch (weightCategories) {
    case "A_FINE_BOI":
      return "A fine boi";
    case "HE_CHOMNK":
      return "He chomnk";
    case "A_HECKING_CHONKER":
      return "A hecking chonker";
    case "HEFTY_CHONK":
      return "Hefty chonk";
    case "MEGA_CHONKER":
      return "Mega chonker";
    case "OH_LAWD_HE_COMIN":
      return "Oh lawd he comin";
    default:
      return "Choisir une catégorie de poids";
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

export const weightCategoryColors = (weightCategory?: WeightCategoryType) => {
  switch (weightCategory) {
    case "A_FINE_BOI":
      return "#ff8080";
    case "HE_CHOMNK":
      return "#e67373";
    case "A_HECKING_CHONKER":
      return "#cc6666";
    case "HEFTY_CHONK":
      return "#b35959";
    case "MEGA_CHONKER":
      return "#994c4c";
    case "OH_LAWD_HE_COMIN":
      return "#000000";
    default:
      return "#ff6666";
  }
};

export const textColor = (bgColor: string) => {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
};

export const convertTokenToAmount = (token: number): number => {
  const exchangeRate = 100 / 11500;

  return Math.round(token * exchangeRate);
};

export const mmrAverage = (monsters: Monster[]): number => {
  let mmr = 0;
  const divider = monsters?.length;

  monsters?.forEach((monster: Monster) => {
    mmr += monster.mmr;
  });

  return divider > 0 ? mmr / divider : 0;
};

export const mmrMax = (monsters: Monster[]): number => {
  let mmr = 0;
  monsters?.forEach((monster: Monster) => {
    if (monster.mmr > mmr) {
      mmr = monster.mmr;
    }
  });
  return mmr;
};

export const countAdminRole = (users: UserModel[]): number => {
  let count = 0;
  users.forEach((user: UserModel) => {
    if (user.role === "ADMIN") {
      count++;
    }
  });
  return count;
};

export const countUserRole = (users: UserModel[]): number => {
  let count = 0;
  users.forEach((user: UserModel) => {
    if (user.role === "USER") {
      count++;
    }
  });
  return count;
};

export enum CreditsPacks {
  PACK_1 = "475",
  PACK_2 = "1000",
  PACK_3 = "2050",
  PACK_4 = "3650",
  PACK_5 = "5350",
  PACK_6 = "11000",
}

export const exchangeRate = 100 / 11500;

export const exchangeFees = 0.15;

export const MoneyToCredits = {
  5: CreditsPacks.PACK_1,
  10: CreditsPacks.PACK_2,
  20: CreditsPacks.PACK_3,
  35: CreditsPacks.PACK_4,
  50: CreditsPacks.PACK_5,
  100: CreditsPacks.PACK_6,
};

export const CreditsToMoney = {
  [CreditsPacks.PACK_1]: 5,
  [CreditsPacks.PACK_2]: 10,
  [CreditsPacks.PACK_3]: 20,
  [CreditsPacks.PACK_4]: 35,
  [CreditsPacks.PACK_5]: 50,
  [CreditsPacks.PACK_6]: 100,
};

export const convertCreditsToMoney = (credits: number): number => {
  switch (credits) {
    case 475:
      return 5;
    case 1000:
      return 10;
    case 2050:
      return 20;
    case 3650:
      return 35;
    case 5350:
      return 50;
    case 11000:
      return 100;
    default:
      return 0;
  }
};

export const convertMoneyToCredits = (money: number): number => {
  switch (money) {
    case 5:
      return 475;
    case 10:
      return 1000;
    case 20:
      return 2050;
    case 35:
      return 3650;
    case 50:
      return 5350;
    case 100:
      return 11000;
    default:
      return 0;
  }
};

export const getImageByAmount = (amount: number): string => {
  let imageName = "";

  if (amount >= 0 && amount <= 475) {
    imageName = "1.png";
  } else if (amount > 475 && amount <= 1000) {
    imageName = "2.png";
  } else if (amount > 1000 && amount <= 2050) {
    imageName = "3.png";
  } else if (amount > 2050 && amount <= 3650) {
    imageName = "4.png";
  } else if (amount > 3650 && amount <= 5350) {
    imageName = "5.png";
  } else if (amount > 5350 && amount > 11000) {
    imageName = "6.png";
  } else {
    imageName = "1.png";
  }

  return imageName;
};
