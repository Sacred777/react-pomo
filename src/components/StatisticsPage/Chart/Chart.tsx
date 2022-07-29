import React, {ReactEventHandler} from 'react';
import styles from './chart.module.css';
import {EColors, Text} from "../../Text";
import {TStat} from "../../../models/statObject";
import {secondsToString} from "../../../utils/timeutiltties";

export interface IStatForButton {
  key: number;
  name: string;
  level: string;
  onClick: ReactEventHandler<HTMLButtonElement>;
  data: string;
}

interface iChartProps {
  currentWeekStat: TStat[];
  onClick: ReactEventHandler<HTMLButtonElement>;
}

export function Chart({currentWeekStat, onClick}: iChartProps) {
  // Получаем шаг для шкалы времени на графике
  const maxPomodoroTime = currentWeekStat.length === 0 ? 4 : currentWeekStat.reduce((prev, current) => prev.pomodoroTime > current.pomodoroTime ? prev : current).pomodoroTime;
  const stepOfLevels = Math.ceil(maxPomodoroTime / 300) * 60;

  const pomodoroLevel = [];
  for (let i = 0; i <= 6; i++) {
    const result = currentWeekStat.find((item) => item.dayOfTheWeek === i + 1);
    pomodoroLevel[i] = result ? getPersentFromSeconds(result.pomodoroTime) + '%' : '';
  }

  const statForButtons = [];
  const rusShortNameOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  for (let i = 0; i <= 6; i++) {
    const findedData = currentWeekStat.find((item) => item.dayOfTheWeek === i + 1);
    const objOfData: IStatForButton = {
      key: findedData ? findedData.dayOfTheWeek : i + 1,
      name: rusShortNameOfWeek[i],
      level: findedData ? getPersentFromSeconds(findedData.pomodoroTime) + '%' : '',
      onClick: onClick,
      data: findedData ? 'notempty' : 'empty',
    }
    statForButtons.push(objOfData);
  }

  const oneLineLevelValue = secondsToString(stepOfLevels);
  const twoLineLevelValue = secondsToString(stepOfLevels * 2);
  const threeLineLevelValue = secondsToString(stepOfLevels * 3);
  const
    fourLineLevelValue = secondsToString(stepOfLevels * 4);

  function getPersentFromSeconds(seconds: number) {
    return (Math.round((seconds * 90) / (stepOfLevels * 5))).toString();
  }

  return (
    <div className={styles.rightChartWrapper}>
      <div className={styles.chartField}>
        <div className={styles.chartLine}>
          <Text As={'p'} size={12} lineHeight={33}>{fourLineLevelValue}</Text>
        </div>
        <div className={styles.chartLine}>
          <Text As={'p'} size={12} lineHeight={33}>{threeLineLevelValue}</Text>
        </div>
        <div className={styles.chartLine}>
          <Text As={'p'} size={12} lineHeight={33}>{twoLineLevelValue}</Text>
        </div>
        <div className={styles.chartLine}>
          <Text As={'p'} size={12} lineHeight={33}>{oneLineLevelValue}</Text>
        </div>
        <div className={styles.chartLine}></div>

        <div className={styles.chartColumns}>
          {
            statForButtons.map((button) => (
              <div
                className={styles.buttonWrapper}
                key={button.key}
              >
                <button
                  className={styles.button}
                  id={button.key.toString()}
                  style={{height: button.level}}
                  onClick={button.onClick}
                  data-level={button.data}>
                </button>
                <Text
                  As={'p'}
                  size={24}
                  lineHeight={24}
                  color={EColors.grey99}>
                  {button.name}
                </Text>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
