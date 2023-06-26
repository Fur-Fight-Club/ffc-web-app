import { useContext } from 'react';

import { DropdownContext } from '../../dropdown-context';
import styles from './DropdownItem.module.scss';

import { mergeClassNames } from 'src/utils/ReactUtils';

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: (...args: string[]) => void;
  className?: string;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  const { activeItem, setActiveItem } = useContext(DropdownContext);
  const handleClick = () => {
    setActiveItem(children);
    if (onClick) onClick();
  };
  return (
    <div
      className={mergeClassNames([
        styles.item,
        activeItem === children && styles.itemSelected,
      ])}
      onMouseDown={handleClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
