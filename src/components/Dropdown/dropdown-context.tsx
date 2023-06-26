import { createContext } from 'react';

export type DropdownContextType = {
  activeItem: string | React.ReactNode;
  setActiveItem: (item: string | React.ReactNode) => void;
};

export const DropdownContext = createContext<DropdownContextType>({
  activeItem: '',
  setActiveItem: () => {},
});
