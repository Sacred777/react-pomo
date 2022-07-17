import React, {ReactEventHandler, useEffect, useState} from 'react';
import styles from './statisticspage.module.css';
import {EColors, EWeight, Text} from "../Text";
import {EIcons, Icon} from "../Icon";
import {Break} from "../Break";
import {WeeksSelect} from "./WeeksSelect";

export interface IStatForButton {
  key: number;
  name: string;
  level: string;
  onClick: ReactEventHandler<HTMLButtonElement>;
  data: string;
}

export interface ICurrentMenu {
  id: string;
  name: string;
}

export interface IStatisticsPageProps {
  currentMenu: ICurrentMenu[];
  onClick: ReactEventHandler<HTMLDivElement>;
  statForButtons: IStatForButton[];
  dayOfWeek: string;
  workingOnTaskTime: string;
  pomodoroCount: number;
  focusPercents: string;
  pauseTime: string;
  stopCount: string;
  oneLineLevelValue: string;
  twoLineLevelValue: string;
  threeLineLevelValue: string;
  fourLineLevelValue: string;
}

export function StatisticsPage(props: IStatisticsPageProps) {

  let pomoName = 'помидоров';
  if (props.pomodoroCount === 1) {
    pomoName = 'помидор';
  } else if (props.pomodoroCount > 1 && props.pomodoroCount < 5) {
    pomoName = 'помидора';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>

        <Text size={24} lineHeight={33} weight={EWeight.bold}>Ваша активность</Text>

        <WeeksSelect
          currentMenu={props.currentMenu}
          onClick={props.onClick}
        />
      </div>

      <div className={styles.chartWrapper}>
        <div className={styles.leftChartWrapper}>

          <div className={styles.workingOnTasks}>
            <Text size={24} lineHeight={33} weight={EWeight.bold}>{props.dayOfWeek}</Text>
            <Break size={12} top/>
            <Text
              size={16}
              lineHeight={33}>
              {props.workingOnTaskTime ? 'Вы работали над задачами в течении' : 'Нет данных'}
              <Break size={5} inline={true}/>
              <Text
                size={16}
                lineHeight={33}
                color={EColors.red}
                weight={EWeight.bold}
              >
                {props.workingOnTaskTime}
              </Text>
            </Text>
          </div>

          <div className={styles.pomodoroCount}>
            <div className={styles.pomodoroCountIcon}>
              {props.pomodoroCount === 0
                ? <Icon name={EIcons.pomo} size={115}/>
                : <Icon name={EIcons.logo} size={81}/>
              }

              <Break size={16}/>

              {props.pomodoroCount !== 0 && <Text size={24} lineHeight={33} weight={EWeight.bold}
                                                  color={EColors.grey99}>{`x ${props.pomodoroCount}`}              </Text>}
            </div>

            {props.pomodoroCount !== 0 && <div className={styles.pomodoroCountInfo}>
              <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}
                    color={EColors.white}>{`${props.pomodoroCount} ${pomoName}`}</Text>
            </div>}
          </div>
        </div>

        <div className={styles.rightChartWrapper}>
          <div className={styles.chartField}>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>{props.fourLineLevelValue}</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>{props.threeLineLevelValue}</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>{props.twoLineLevelValue}</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>{props.oneLineLevelValue}</Text>
            </div>
            <div className={styles.chartLine}></div>

            <div className={styles.chartColums}>
              {
                props.statForButtons.map((button) => (
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

      </div>
      <div className={styles.bottomWrapper}>

        <div
          className={styles.items + ' ' + styles.focus}
          data-value={props.focusPercents !== '0%' ? 'value' : 'notvalue'}>
          <div
            className={styles.info}
          >
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Фокус</Text>
            <Text size={64} lineHeight={76}>{props.focusPercents}</Text>
          </div>
          <Icon name={EIcons.focus} size={129}/>
        </div>

        <div
          className={styles.items + ' ' + styles.pause}
          data-value={props.pauseTime !== '0c' ? 'value' : 'notvalue'}
        >
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Время на паузе</Text>
            <Text size={64} lineHeight={76}>{props.pauseTime}</Text>
          </div>
          <Icon name={EIcons.pause} size={129}/>
        </div>

        <div
          className={styles.items + ' ' + styles.stop}
          data-value={props.stopCount !== '0' ? 'value' : 'notvalue'}
        >
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Остановки</Text>
            <Text size={64} lineHeight={76}>{props.stopCount}</Text>
          </div>
          <Icon name={EIcons.stop} size={129}/>
        </div>
      </div>
    </div>
  );
}
