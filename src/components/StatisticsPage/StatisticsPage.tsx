import React from 'react';
import styles from './statisticspage.module.css';
import {EColors, EWeight, Text} from "../Text";
import {EIcons, Icon} from "../Icon";
import {Break} from "../Break";

export function StatisticsPage() {
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
            <Text size={24} lineHeight={33} weight={EWeight.bold}>Суббота</Text>
            <Break size={12} top/>
            <Text size={16} lineHeight={33}>Нет данных</Text>
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
              <Text As={'p'} size={12} lineHeight={33}>25 мин</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>25 мин</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>25 мин</Text>
            </div>
            <div className={styles.chartLine}>
              <Text As={'p'} size={12} lineHeight={33}>25 мин</Text>
            </div>
            <div className={styles.chartLine}></div>

            <div className={styles.chartColums}>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Пн</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Вт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Ср</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Чт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Пт</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
                <Text As={'p'} size={24} lineHeight={24} color={EColors.grey99}>Сб</Text>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button}></button>
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
            <Text size={64} lineHeight={76}>0%</Text>
          </div>
          <Icon name={EIcons.focus} size={129}/>
        </div>

        <div className={styles.items + ' ' + styles.pause}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Время на паузе</Text>
            <Text size={64} lineHeight={76}>0м</Text>
          </div>
          <Icon name={EIcons.pause} size={129}/>
        </div>

        <div className={styles.items + ' ' + styles.stop}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Остановки</Text>
            <Text size={64} lineHeight={76}>0</Text>
          </div>
          <Icon name={EIcons.stop} size={129}/>
        </div>
      </div>
    </div>
  );
}
