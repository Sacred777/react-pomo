import React from 'react';
import styles from './text.module.css';
import classNames from 'classnames';

export enum EColors {
  black = 'black',
  white = 'white',
  red = 'red',
  green = 'green',
  greyC4 = 'greyC4',
  grey99 = 'grey99',
  grey33 = 'grey33',
}

export type TSizes = 150 | 72 | 64 | 24 | 16 | 12;
export type TLineHeight = 179 | 76 | 33 | 24 | 17 | 1;

export enum EWeight {
  thin = 'thin',
  extraLight = 'extraLight',
  light = 'light',
  regular = 'regular',
  medium = 'medium',
  bold = 'bold',
}

interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'li' | 'label';
  children?: React.ReactNode;
  size: TSizes;
  lineHeight: TLineHeight;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColors;
  weight?: EWeight;
}

export function Text(props: ITextProps) {
  const {
    As = 'span',
    color = EColors.black,
    weight = EWeight.regular,
    lineHeight,
    children,
    size,
    mobileSize,
    tabletSize,
    desktopSize,
  } = props;

  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    styles[weight],
    styles[`h${lineHeight}`],
    // { [styles.bold]: bold },
    {[styles[`m${mobileSize}`]]: mobileSize},
    {[styles[`t${tabletSize}`]]: tabletSize},
    {[styles[`d${desktopSize}`]]: desktopSize},
  );

  return (
    <As className={classes}>
      {children}
    </As>
  );
}
