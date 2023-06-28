import { createContext } from "react";
import { Monster } from "src/store/monsters/monsters.model";

export type CardListContextType = {
  activeMonster: Monster;
  setActiveMonster: (monster: Monster) => void;
};

export const CardListContext = createContext<CardListContextType>({
  activeMonster: {} as Monster,
  setActiveMonster: () => {},
});
