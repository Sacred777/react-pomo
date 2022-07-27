import classNames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export enum EButtonColors {
  green = 'green',
  grey = 'grey',
  red = 'red',
}

interface IButtonProps {
  children?: React.ReactNode;
  color?: EButtonColors;
  type: 'submit' | 'button' | 'reset';
  notBackground?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button(props: IButtonProps) {
  const {
    children,
    color = EButtonColors.green,
    type = 'button',
    notBackground = false,
    onClick,
    disabled = false,
  } = props;

  const classes = classNames(
    styles.button,
    styles[color],
    {[styles['notBackground']]: notBackground},
  );

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
