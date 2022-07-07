import React from 'react';
import styles from './statisticspage.module.css';
import {EColors, EWeight, Text} from "../Text";
import {EIcons, Icon} from "../Icon";
import {Break} from "../Break";

export interface IStatisticsPageProps {
  dayOfWeek: string;
  workingOnTaskTime: string;
  pomodoroCount: number;
  focusPercents: string;
  pauseTime: string;
  stopCount: string;
  moButtonHeight: string;
  tuButtonHeight: string;
  weButtonHeight: string;
  thButtonHeight: string;
  frButtonHeight: string;
  saButtonHeight: string;
  suButtonHeight: string;
  oneLineLevelValue: string;
  twoLineLevelValue: string;
  threeLineLevelValue: string;
  fourLineLevelValue: string;
}

export function StatisticsPage({...props}: IStatisticsPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <Text size={24} lineHeight={33} weight={EWeight.bold}>Ваша активность</Text>
        <div className={styles.select}>
          <Text size={16} lineHeight={17}>Эта неделя</Text>
          <Icon name={EIcons.rectangleDown}/>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <div className={styles.leftChartWrapper}>

          <div className={styles.workingOnTasks}>
            <Text size={24} lineHeight={33} weight={EWeight.bold}>{props.dayOfWeek}</Text>
            <Break size={12} top/>
            <Text
              size={16}
              lineHeight={33}>
              {`Вы работали над задачами в течении`}
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
              <Icon name={EIcons.pomo} size={115}/>
              <Break size={16}/>
              {/*<Text size={24} lineHeight={33} weight={EWeight.bold} color={EColors.grey99}>x 2</Text>*/}
            </div>
            {/*<div className={styles.pomodoroCountInfo}>*/}
              {/*<Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold} color={EColors.white}>2 помидора</Text>*/}
            {/*</div>*/}
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
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='1'
                  style={{height: props.moButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Пн</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='2'
                  style={{height: props.tuButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Вт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='3'
                  style={{height: props.weButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Ср</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='4'
                  style={{height: props.thButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Чт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='5'
                  style={{height: props.frButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Пт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='6'
                  style={{height: props.saButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Сб</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button}
                  id='7'
                  style={{height: props.suButtonHeight}}>
                </button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Вс</Text>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.bottomWrapper}>

        <div className={styles.items + ' ' + styles.focus}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Фокус</Text>
            <Text size={64} lineHeight={76}>{props.focusPercents}</Text>
          </div>
          <Icon name={EIcons.focus} size={129}/>
        </div>

        <div className={styles.items + ' ' + styles.pause}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Время на паузе</Text>
            <Text size={64} lineHeight={76}>{props.pauseTime}</Text>
          </div>
          <Icon name={EIcons.pause} size={129}/>
        </div>

        <div className={styles.items + ' ' + styles.stop}>
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
