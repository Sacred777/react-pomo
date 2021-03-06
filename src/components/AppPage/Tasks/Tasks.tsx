import React, {useEffect, useState} from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { secondsToString } from '../../../utils/timeutiltties';
import { Break } from '../../Break';
import { Dropdown } from '../../Dropdown';
import { EColors, EWeight, Text } from '../../Text';
import styles from './tasks.module.css';
import { TasksItem } from './TasksItem';
import {NOOP} from "../../../utils/js/noop";

export function Tasks() {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [isEditable, setIsEditable ] = useState(false);
  const [value, setValue] = useState('');


  function editTask() {
    // console.log(id);
    setIsEditable(true);
    // setValue();
  }

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
          <li className={styles.item} key={task.id}>
            <div className={styles.taskWrapper}>
              <span className={styles.count}>{task.count}</span>

              <Break size={8} inline />

              {/*<Text*/}
              {/*  size={16}*/}
              {/*  lineHeight={17}*/}
              {/*  weight={EWeight.light}>*/}
              {/*  {task.name}*/}
              {/*</Text>*/}
              <form action="submit">
                <input
                  type='text'
                  className={styles.taskInput}
                  value={task.name}
                  disabled={!isEditable}
                  onChange={isEditable ? ()=> console.log('onChange') : NOOP}
                />
              </form>

            </div>

            {/* <Break size={8} inline /> */}

            <Dropdown
              button={
                <button className={styles.dropdownBtn}>
                  <span className={styles.dropdownIcon}></span>
                  <span className={styles.dropdownIcon}></span>
                  <span className={styles.dropdownIcon}></span>
                </button>
              }>
              <ul className={styles.dropdown}>
                <TasksItem
                  taskId={task.id}
                  editTask={editTask}
                />
              </ul>

            </Dropdown>
          </li>
        ))}
      </ul>
      <Break size={20} top />
      <Text size={16} lineHeight={17} color={EColors.grey99} weight={EWeight.light}>{sumTimeString}</Text>
    </>
  );
}
