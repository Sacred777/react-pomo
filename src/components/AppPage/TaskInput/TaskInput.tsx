import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './taskinput.module.css';
import {Break} from '../../Break';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {addTask} from '../../../store/tasksSlice';
import {Button} from '../../Button';

export function TaskInput() {
  const [value, setValue] = useState('');
  const taskTime = useAppSelector(state => state.settings.taskTime);
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    dispatch(addTask(
      {
        id: new Date().getTime(),
        name: value.trim(),
        count: 1,
        time: taskTime,
        isTiming: false,
      })
    );
    setValue('');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <input
          className={styles.task}
          type='text'
          name='task'
          placeholder='Название задачи'
          value={value}
          onChange={handleChange}>
        </input>
      </label>
      <Break size={25} top/>
      <Button type={'submit'}>Добавить</Button>
    </form>
  );
}
