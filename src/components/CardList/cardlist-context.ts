import { createContext } from "react";
import { Arena } from "src/store/arenas/arenas.model";
import { Match } from "src/store/matches/matches.model";
import { Monster } from "src/store/monsters/monsters.model";

export type ItemPayload = Monster | Arena | Match;

export type CardListContextType = {
  activeItem: ItemPayload;
  setActiveItem: (item: ItemPayload) => void;
};

export const CardListContext = createContext<CardListContextType>({
  activeItem: {} as ItemPayload,
  setActiveItem: () => {},
});
