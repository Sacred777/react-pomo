import React from 'react';
import styles from './taskinput.module.css';
import { EColors, EWeight, Text } from '../../Text';
import { Break } from '../../Break';

export function TaskInput() {
  return (
    <form className={styles.form}>
      <div>
        <label>
          <input className={styles.task} type='text' name='task' placeholder='Название задачи'></input>
        </label>
      </div>
      <Break size={25} top />
      <button className={styles.addBtn}>
        <Text size={16} lineHeight={17} color={EColors.white} weight={EWeight.medium}>Добавить</Text>
      </button>
    </form>
  );
}
