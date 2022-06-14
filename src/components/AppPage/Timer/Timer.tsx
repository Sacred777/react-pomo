import React from 'react';
import styles from './timer.module.css';
import { EColors, EWeight, Text } from '../../Text';
import { Break } from '../../Break';
import { AddIcon } from '../../Icons';
import { EIcons, Icon } from '../../Icon';
import { Button, EButtonColors } from '../../Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { showTime } from '../../../utils/timeutiltties';
import { increaseCount } from '../../../store/tasksSlice';

export function Timer() {
  const dispatch = useAppDispatch();

  const { taskTime } = useAppSelector(state => state.settings);
  const tasks = useAppSelector(state => state.tasks.tasks);

  // Нет задач
  const isTasks = tasks.length !== 0;
  console.log(isTasks);

  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);

  const timerString = isTasks ? showTime(sortTasks[0].time) : showTime(taskTime);
  const taskName = isTasks ? sortTasks[0].name : 'Задач нет';
  console.log(taskName);
  const taskCount = isTasks ? `Помидор ${sortTasks[0].count}` : 'Помидор';
  console.log(taskCount);

  function handleAddCount() {
    dispatch(increaseCount(sortTasks[0].id))
  }

  return (
    <>
      <div className={styles.header}>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>{taskName}</Text>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>{taskCount}</Text>
      </div>
      <div className={styles.body}>

        <div className={styles.timerBox}>
          <Text As="span" size={150} lineHeight={179} weight={EWeight.extraLight} color={EColors.grey33}>
            {timerString ? timerString : 'Нет задач'}</Text>
          <button
            className={styles.addBtnBox}
            onClick={handleAddCount}
            disabled={!isTasks}
          >
            <Icon name={EIcons.add} size={50}></Icon>

          </button>
        </div>

        <p>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey99}>Задача 1 -</Text>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey33}>{taskName}</Text>
        </p>

        <Break size={35} top />

        <div className={styles.btnsBox}>
          {/* <button className={styles.startBtn}>
            <Text size={16} lineHeight={17} weight={EWeight.medium} color={EColors.white}>Старт</Text>
          </button> */}

          <Button
            type={'button'}
            disabled={!isTasks}
          >
            Старт
          </Button>

          <Break size={25} inline />

          {/* <button className={styles.stopBtn}>
            <Text size={16} lineHeight={17} weight={EWeight.medium} color={EColors.greyC4}>Стоп</Text>
          </button> */}

          <Button
            type={'button'}
            color={EButtonColors.grey}
            notBackground={true}
            disabled={!isTasks}
          >
            Стоп
          </Button>


        </div>
      </div>
    </>
  );
}
