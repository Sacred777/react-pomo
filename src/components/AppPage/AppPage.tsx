import React from 'react';
import styles from './apppage.module.css';
import { Content } from './Content';
import { TaskInput } from './TaskInput';
import { Timer } from './Timer';

export function AppPage() {
  return (
    <div className={styles.mainBox}>
      <div className={styles.leftBox}>
        <Content />
        <TaskInput />
      </div>
      <div className={styles.rightBox}>
        <Timer />
      </div>
    </div>
  );
}
