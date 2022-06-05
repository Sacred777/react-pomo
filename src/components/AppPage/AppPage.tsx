import React from 'react';
import { Break } from '../Break';
import styles from './apppage.module.css';
import { Content } from './Content';
import { TaskInput } from './TaskInput';
import { Tasks } from './Tasks';
import { Timer } from './Timer';

export function AppPage() {
  return (
    <div className={styles.mainBox}>
      <div className={styles.leftBox}>
        <Content />
        <TaskInput />
        <Break size={25} top/>
        <Tasks/>
      </div>
      <div className={styles.rightBox}>
        <Timer />
      </div>
    </div>
  );
}
