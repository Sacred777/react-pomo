import classNames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export enum EButtonColors {
  green = 'green',
  grey = 'grey',
  red = 'red',
  // greyGreen = 'greyGreen',
  // greyRed = 'greyRed',
}

interface IButtonProps {
  children?: React.ReactNode;
  color?: EButtonColors;
  type: 'submit' | 'button' | 'reset';
  notBackground?: boolean;
  // TODO Нужен ли этот onClick?
  onClick?: () => void;
}

export function Button(props: IButtonProps) {
  const {
    children,
    color = EButtonColors.green,
    type = 'button',
    notBackground = false,
    onClick,
  } = props;

  const classes = classNames(
    styles.button,
    styles[color],
    {[styles['notBackground']]: notBackground},
  );

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
