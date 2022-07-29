import React, {ReactEventHandler, useState} from 'react';
import styles from './weeksselect.module.css';
import {Dropdown} from "../../Dropdown";
import {Text} from "../../Text";
import {EIcons, Icon} from "../../Icon";

interface ICurrentMenu {
  id: string;
  name: string;
}

interface IWeeksSelectProps {
  currentMenu: ICurrentMenu[];
  onClick: ReactEventHandler<HTMLDivElement>;
}

export function WeeksSelect({currentMenu, onClick}: IWeeksSelectProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  }

  const handleClose = () => {
    setIsOpened(false);
  }

  return (
    <Dropdown
      onOpen={handleOpen}
      onClose={handleClose}
      button={
        <div
          className={isOpened ? styles.select + ' ' + styles.opened + ' ' + styles.notBorder : styles.select}
          id={currentMenu[0].id}
        >
          <Text size={16} lineHeight={17}>{currentMenu[0].name}</Text>
          <Icon name={EIcons.rectangleDown}/>
        </div>
      }>
      <div
        onClick={onClick}
        className={isOpened ? styles.select + ' ' + styles.opened : styles.select}
        id={currentMenu[1].id}
      >
        <Text size={16} lineHeight={17}>{currentMenu[1].name}</Text>
      </div>
      <div
        onClick={onClick}
        className={isOpened ? styles.select + ' ' + styles.opened : styles.select}
        id={currentMenu[2].id}
      >
        <Text size={16} lineHeight={17}>{currentMenu[2].name}</Text>
      </div>

    </Dropdown>
  );
}
