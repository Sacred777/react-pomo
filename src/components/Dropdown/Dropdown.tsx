import React, { useEffect, useState } from 'react';
import { NOOP } from '../../utils/js/noop';
import styles from './dropdown.module.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  useEffect(() => {
    setIsDropdownOpen(isOpen);
  },[isOpen]);

  useEffect(() => {
    isDropdownOpen ? onOpen() : onClose();
  }, [isDropdownOpen]);

  const handleOpen = () => {
    if(isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div
            className={styles.list}
            onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
