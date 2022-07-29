import React from 'react';
import styles from './icon.module.css';
import classNames from 'classnames';
import {
  CloseBtnIcon,
  LogoIcon,
  StatisticsIcon,
  SettingsIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
  FocusIcon,
  PauseIcon,
  StopIcon,
  AddIcon,
  RectangleDownIcon, PomoIcon,
} from "../Icons";


const icons = {
  close: CloseBtnIcon,
  logo: LogoIcon,
  statistics: StatisticsIcon,
  settings: SettingsIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  focus: FocusIcon,
  pause: PauseIcon,
  stop: StopIcon,
  add: AddIcon,
  rectangleDown: RectangleDownIcon,
  pomo: PomoIcon,
}

export enum EIcons {
  close = 'close',
  logo = 'logo',
  statistics = 'statistics',
  settings = 'settings',
  delete = 'delete',
  edit = 'edit',
  minus = 'minus',
  plus = 'plus',
  focus = 'focus',
  pause = 'pause',
  stop = 'stop',
  add = 'add',
  rectangleDown = 'rectangleDown',
  pomo = 'pomo',
}

export type TSizes = 129 | 115 | 81 | 50 | 40 | 24 | 20 | 18 | 16;

interface IIconProps {
  name: EIcons;
  size?: TSizes;
  title?: string;
  role?: string;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
}

export function Icon(props: IIconProps) {
  const {
    name,
    size = 18,
    title,
    role,
    mobileSize,
    tabletSize,
    desktopSize
  } = props;

  const classes = classNames(
    styles[`i${size}`],
    {[styles[`m${mobileSize}`]]: mobileSize},
    {[styles[`t${tabletSize}`]]: tabletSize},
    {[styles[`d${desktopSize}`]]: desktopSize},
  );

  const IconComponent = icons[name];

  return (
    IconComponent(
      {
        className: classes,
        title: title,
        role: role,
      })
  );
}
