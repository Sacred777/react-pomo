import React from 'react';
import styles from './bottomdashboard.module.css';
import {EWeight, Text} from "../../Text";
import {EIcons, Icon} from "../../Icon";
import {TStat} from "../../../models/statObject";
import {getStringOfSecondsNS} from "../../../utils/timeutiltties";

interface IBottomDashboardProps {
  statForDay: TStat;
}

export function BottomDashboard({statForDay}: IBottomDashboardProps) {
  const {
    pomodoroTime,
    timerTime,
    date,
    pauseTime,
    stopCount,
  } = statForDay;

  const focusPercents = date === '' ? '0%' : Math.round(pomodoroTime * 100 / timerTime).toString() + '%';
  const pauseTimeString = date === '' ? '0c' : getStringOfSecondsNS(pauseTime);
  const statForDayString = date === '' ? '0' : stopCount.toString();

  return (
    <div className={styles.bottomWrapper}>

      <div
        className={styles.items + ' ' + styles.focus}
        data-value={focusPercents !== '0%' ? 'value' : 'notvalue'}>
        <div
          className={styles.info}
        >
          <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Фокус</Text>
          <Text size={64} lineHeight={76}>{focusPercents}</Text>
        </div>
        <Icon name={EIcons.focus} size={129}/>
      </div>

      <div
        className={styles.items + ' ' + styles.pause}
        data-value={pauseTimeString !== '0c' ? 'value' : 'notvalue'}
      >
        <div className={styles.info}>
          <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Время на паузе</Text>
          <Text size={64} lineHeight={76}>{pauseTimeString}</Text>
        </div>
        <Icon name={EIcons.pause} size={129}/>
      </div>

      <div
        className={styles.items + ' ' + styles.stop}
        data-value={statForDayString !== '0' ? 'value' : 'notvalue'}
      >
        <div className={styles.info}>
          <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Остановки</Text>
          <Text size={64} lineHeight={76}>{statForDayString}</Text>
        </div>
        <Icon name={EIcons.stop} size={129}/>
      </div>
    </div>
  );
}
