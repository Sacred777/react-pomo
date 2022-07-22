import React from 'react';
import {useAppSelector} from '../../../hooks/reduxHooks';
import {secondsToString} from '../../../utils/timeutiltties';
import {Break} from '../../Break';
import {EColors, EWeight, Text} from '../../Text';
import styles from './tasks.module.css';
import {TasksItem} from './TasksItem';

export function Tasks() {
  const tasks = useAppSelector(state => state.tasks.tasks);

  // Считаем сколько времени на помидоры по всем задачам
  let sumTime = 0;
  tasks.forEach((task) => {
    sumTime += task.time * task.count;
  })

  const sumTimeString = secondsToString(sumTime);

  return (
    <>
      <ul className={styles.list}>
        {tasks.map(task => (
          <TasksItem
            key={task.id}
            id={task.id}
            count={task.count}
            name={task.name}
          />
        ))}
      </ul>
      <Break size={20} top/>
      <Text size={16} lineHeight={17} color={EColors.grey99} weight={EWeight.light}>{sumTimeString}</Text>
    </>
  );
}
