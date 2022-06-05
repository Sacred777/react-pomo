import React, { createElement } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { Break } from '../../Break';
import { EIcons, Icon } from '../../Icon';
import { EWeight, Text } from '../../Text';
import styles from './tasks.module.css';

export function Tasks() {
  const tasks = useAppSelector(state => state.tasks)
  // tasks.sort((prev, next) => prev.id - next.id);
  // .sort((prev, next) => prev.id - next.id);
  // console.log(tasks);
  // console.log(sortTasks);

  return (
    <ul className={styles.list}>
      {tasks.map(task => (
        <li className={styles.item} key={task.id}>
          <div>
            <span className={styles.count}>{task.count}</span>

            <Break size={8} inline />

            <Text
              size={16}
              lineHeight={17}
              weight={EWeight.light}>
              {task.name}
            </Text>
          </div>

          <Break size={8} inline />

          <button className={styles.dropdownBtn}>
            <span className={styles.dropdownIcon}></span>
            <span className={styles.dropdownIcon}></span>
            <span className={styles.dropdownIcon}></span>
          </button>
        </li>
      ))}
    </ul>

  );
}
