import { createContext } from "react";

export type CardListContextType = {
  activeItem: string | React.ReactNode;
  setActiveItem: (item: string | React.ReactNode) => void;
};

export const DropdownContext = createContext<CardListContextType>({
  activeItem: "",
  setActiveItem: () => {},
});
