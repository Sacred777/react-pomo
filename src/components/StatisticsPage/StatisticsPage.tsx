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
            <Text size={16} lineHeight={33}>Вы работали над задачами в течение</Text>
          </div>
          <div className={styles.pomodoroCount}>
            <div className={styles.pomodoroCountIcon}>
              <Icon name={EIcons.logo} size={81}/>
              <Break size={16}/>
              <Text size={24} lineHeight={33} weight={EWeight.bold} color={EColors.grey99}>x 2</Text>
            </div>
            <div className={styles.pomodoroCountInfo}>
              <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold} color={EColors.white}>2 помидора</Text>
            </div>
          </div>
        </div>
        <div className={styles.rightChartWrapper}>

        </div>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.items + ' ' + styles.focus}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Фокус</Text>
            <Text size={64} lineHeight={76}>35%</Text>
          </div>
          <Icon name={EIcons.focus} size={129}/>
        </div>
        <div className={styles.items + ' ' + styles.pause}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Время на паузе</Text>
            <Text size={64} lineHeight={76}>9м</Text>
          </div>
          <Icon name={EIcons.pause} size={129}/>
        </div>
        <div className={styles.items + ' ' + styles.stop}>
          <div className={styles.info}>
            <Text As={'p'} size={24} lineHeight={33} weight={EWeight.bold}>Остановки</Text>
            <Text size={64} lineHeight={76}>3</Text>
          </div>
          <Icon name={EIcons.stop} size={129}/>
        </div>
      </div>
    </div>
  );
}
