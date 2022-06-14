import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import styles from './tasksitem.module.css';
import { EColors, Text } from '../../../Text';
import { Break } from '../../../Break';

interface ITasksItem {
  taskId: number;
}

export function TasksItem({taskId}: ITasksItem) {
  return (
    <>
    <li className={styles.tasksItem} onClick={() => console.log(taskId)}>
      <Icon name={EIcons.plus} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Увеличить</Text>
    </li>
    <li className={styles.tasksItem}>
      <Icon name={EIcons.minus} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Уменьшить</Text>
    </li>
    <li className={styles.tasksItem}>
      <Icon name={EIcons.edit} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Редактировать</Text>
    </li>
    <li className={styles.tasksItem}>
      <Icon name={EIcons.delete} />
      <Break size={8}/>
      <Text size={16} lineHeight={17} color={EColors.grey99}>Удалить</Text>
    </li>
    </>
  );
}
