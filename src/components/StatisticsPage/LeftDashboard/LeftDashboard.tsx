import React from 'react';
import styles from './leftdashboard.module.css';
import {EColors, EWeight, Text} from "../../Text";
import {Break} from "../../Break";
import {EIcons, Icon} from "../../Icon";
import {TStat} from "../../../models/statObject";
import {getFullNameOfDayOfWeek, getStringOfSecondsHHMM} from "../../../utils/timeutiltties";

interface ILeftDashboardProps {
  statForDay: TStat;
  dayOfWeekForDisplay: number;
}

export function LeftDashboard({statForDay, dayOfWeekForDisplay}: ILeftDashboardProps) {
  const {
    pomodoroCount,
    dayOfTheWeek,
    pomodoroTime,
    date,
  } = statForDay;

  let pomoName = 'помидоров';
  if (pomodoroCount === 1) {
    pomoName = 'помидор';
  } else if (pomodoroCount > 1 && pomodoroCount < 5) {
    pomoName = 'помидора';
  }

  const nameDayOfWeek = date === ''
    ? getFullNameOfDayOfWeek(dayOfWeekForDisplay - 1)
    : getFullNameOfDayOfWeek(dayOfTheWeek - 1);

  return (
    <div className={styles.leftChartWrapper}>
      <div className={styles.workingOnTasks}>
        <Text size={24} lineHeight={33} weight={EWeight.bold}>{nameDayOfWeek}</Text>
        <Break size={12} top/>
        <Text
          size={16}
          lineHeight={33}>
          {pomodoroTime === 0 ? 'Нет данных' : 'Вы работали над задачами в течении'}
          <Break size={5} inline={true}/>
          <Text
            size={16}
            lineHeight={33}
            color={EColors.red}
            weight={EWeight.bold}
          >
            {getStringOfSecondsHHMM(pomodoroTime)}
          </Text>
        </Text>
      </div>
      <div className={styles.pomodoroCount}>
        <div className={styles.pomodoroCountIcon}>
          {pomodoroCount === 0
            ? <Icon name={EIcons.pomo} size={115}/>
            : <Icon name={EIcons.logo} size={81}/>
          }
          <Break size={16}/>
          {pomodoroCount !== 0
            && <Text
              size={24}
              lineHeight={33}
              weight={EWeight.bold}
              color={EColors.grey99}>{`x ${pomodoroCount}`}
            </Text>}
        </div>

        {pomodoroCount !== 0
          && <div className={styles.pomodoroCountInfo}>
            <Text
              As={'p'}
              size={24}
              lineHeight={33}
              weight={EWeight.bold}
              color={EColors.white}>{`${pomodoroCount} ${pomoName}`}
            </Text>
          </div>}
      </div>
    </div>
  );
}
