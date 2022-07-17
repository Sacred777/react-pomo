import React, {useEffect, useRef, useState} from 'react';
import styles from './tasksitem.module.css';
import {Break} from "../../../Break";
import {EColors, EWeight, Text} from "../../../Text";
import {Dropdown} from "../../../Dropdown";
import {EIcons, Icon} from "../../../Icon";
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {changeNameTask, decreaseCount, increaseCount, removeTask} from "../../../../store/tasksSlice";
import {Portal} from "../../../Portal";
import {Modal} from "../../../Modal";

export interface ITasksItemProps {
  id: number;
  count: number;
  name: string;
}

export function TasksItem({id, count, name}: ITasksItemProps) {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(name);
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function plusCount() {
    dispatch(increaseCount(id));
  }

  function minusCount() {
    dispatch(decreaseCount(id));
  }

  function deleteTask() {
    dispatch(removeTask(id));
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function setTaskEditable() {
    setIsEditable(true);
  }


  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(changeNameTask({id, value}));
    setIsEditable(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Escape') {
        setValue(name);
        setIsEditable(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditable])

  // @ts-ignore
  // @ts-ignore
  return (
    <li className={styles.item}>
      <div className={styles.taskWrapper}>
        <span className={styles.count}>{count}</span>
        <Break size={8} inline/>

        {isEditable ?
          <form action="submit" onSubmit={handleOnSubmit}>
            <input
              type='text'
              className={styles.taskInput}
              value={value}
              autoFocus={true}
              onChange={handleOnChange}
              ref={ref}
            />
          </form>
          :
          <Text As={'p'} size={16} lineHeight={17} weight={EWeight.light}>{value}</Text>
        }
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
          <li>
            <button
              className={styles.tasksButton}
              onClick={plusCount}
            >
              <Icon name={EIcons.plus}/>
              <Break size={8}/>
              <Text size={16} lineHeight={17} color={EColors.grey99}>Увеличить</Text>
            </button>
          </li>

          <li>
            <button
              className={styles.tasksButton}
              onClick={minusCount}
            >
              <Icon name={EIcons.minus}/>
              <Break size={8}/>
              <Text size={16} lineHeight={17} color={EColors.grey99}>Уменьшить</Text>
            </button>
          </li>

          <li>
            <button
              className={styles.tasksButton}
              onClick={setTaskEditable}
            >
              <Icon name={EIcons.edit}/>
              <Break size={8}/>
              <Text size={16} lineHeight={17} color={EColors.grey99}>Редактировать</Text>
            </button>
          </li>

          <li>
            <button
              className={styles.tasksButton}
              onClick={openModal}
            >
              <Icon name={EIcons.delete}/>
              <Break size={8}/>
              <Text size={16} lineHeight={17} color={EColors.grey99}>Удалить</Text>
            </button>
          </li>
        </ul>
      </Dropdown>
      <Portal>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeIconSize={24}
        >
          <div className={styles.modal}>
            <Text As={'h2'} size={24} lineHeight={17}>Удалить задачу?</Text>
            <Break size={25} top/>
            <button
              className={styles.modalDeleteButton}
              onClick={deleteTask}
            >
              <Text size={16} lineHeight={17} weight={EWeight.medium} color={EColors.white}>Удалить</Text>
            </button>
            <Break size={20} top/>
            <button
              className={styles.modalCancelButton}
              onClick={() => setIsModalOpen(false)}
            >
              <Text size={16} lineHeight={17} weight={EWeight.light} color={EColors.black}>Отмена</Text>
            </button>
          </div>
        </Modal>
      </Portal>
    </li>
  );
}
