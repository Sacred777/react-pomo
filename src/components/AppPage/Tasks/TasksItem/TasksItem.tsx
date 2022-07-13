import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import styles from './tasksitem.module.css';
import { EColors, Text } from '../../../Text';
import { Break } from '../../../Break';
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {increaseCount, decreaseCount, removeTask} from "../../../../store/tasksSlice";

interface ITasksItem {
  taskId: number;
  editTask: () => void;
}

export function TasksItem({taskId, editTask}: ITasksItem) {
  const dispatch = useAppDispatch();

  function plusCount() {
    dispatch(increaseCount(taskId));
  }

  function minusCount() {
    dispatch(decreaseCount(taskId));
  }

  function deleteTask() {
    dispatch(removeTask(taskId));
  }

  // TODO typescript нужно поправить
  // @ts-ignore
  return (
    <>
    <li
      className={styles.tasksItem}
      onClick={plusCount}
    >
      <Icon name={EIcons.plus} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Увеличить</Text>
    </li>

    <li
      className={styles.tasksItem}
      onClick={minusCount}
    >
      <Icon name={EIcons.minus} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Уменьшить</Text>
    </li>

    <li
      className={styles.tasksItem}

      onClick={editTask}
    >
      <Icon name={EIcons.edit} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Редактировать</Text>
    </li>

    <li
      className={styles.tasksItem}
      onClick={deleteTask}
    >
      <Icon name={EIcons.delete} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Удалить</Text>
    </li>
    </>
  );
}
