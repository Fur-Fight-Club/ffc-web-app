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
    return user?.role.includes("USER");
  }
  return false;
};

export const isUserAdmin = (user: User) => {
  if (user?.role) {
    return user?.role.includes("ADMIN");
  }
  return false;
};
