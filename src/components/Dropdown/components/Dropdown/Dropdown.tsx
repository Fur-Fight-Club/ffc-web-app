import { useState } from "react";

import { CaretUp } from "@phosphor-icons/react";
import { DropdownContext } from "../../dropdown-context";
import styles from "./Dropdown.module.scss";

import { mergeClassNames } from "@utils/main";

type DropdownProps = {
  children: React.ReactNode;
  label: string | React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

const defaultIcon = <CaretUp size={24} weight="fill" />;

const Dropdown = ({
  children,
  className,
  label,
  icon = defaultIcon,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(label);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={mergeClassNames([styles.container, className])}>
        <button
          className={styles.toggleContainer}
          onClick={toggleMenu}
          onBlur={closeMenu}
        >
          <div className={styles.labelContainer}>
            <div className={styles.activeItem}>{activeItem}</div>
            <div className={isOpen ? styles.iconReversed : undefined}>
              {icon}
            </div>
          </div>
        </button>
        {isOpen && <div className={styles.menuContainer}>{children}</div>}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
