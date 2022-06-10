import React from 'react';
import styles from './timer.module.css';
import { EColors, EWeight, Text } from '../../Text';
import { Break } from '../../Break';
import { AddIcon } from '../../Icons';
import { EIcons, Icon } from '../../Icon';
import { Button, EButtonColors } from '../../Button';

export function Timer() {
  return (
    <>
      <div className={styles.header}>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>Сверстать сайт</Text>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>Помидор 1</Text>
      </div>
      <div className={styles.body}>

        <div className={styles.timerBox}>
          <Text As="span" size={150} lineHeight={179} weight={EWeight.extraLight} color={EColors.grey33}>25:00</Text>
          <button className={styles.addBtnBox}>
            <Icon name={EIcons.add} size={50}></Icon>
          </button>
        </div>

        <p>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey99}>Задача 1 -</Text>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey33}>Сверстать сайт</Text>
        </p>

        <Break size={35} top />

        <div className={styles.btnsBox}>
          {/* <button className={styles.startBtn}>
            <Text size={16} lineHeight={17} weight={EWeight.medium} color={EColors.white}>Старт</Text>
          </button> */}

          <Button type={'button'}>
            Старт
          </Button>

          <Break size={25} inline />

          {/* <button className={styles.stopBtn}>
            <Text size={16} lineHeight={17} weight={EWeight.medium} color={EColors.greyC4}>Стоп</Text>
          </button> */}

          <Button type={'button'} color={EButtonColors.grey} notBackground={true}>Стоп
          </Button>


        </div>
      </div>
    </>
  );
}
