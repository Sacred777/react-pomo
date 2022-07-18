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
import {NOOP} from "../../../../utils/js/noop";

export interface ITasksItemProps {
  id: number;
  count: number;
  name: string;
}

interface IModalProperties {
  modalTitle: string;
  firstButtonStyles: string;
  firstButtonHandler: () => void;
  firstButtonTitle: string;
  secondButtonStyles: string;
  secondButtonHandler: () => void;
  secondButtonTitle: string;
}

export function TasksItem({id, count, name}: ITasksItemProps) {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(name);
  const ref = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialModalProperties: IModalProperties = {
    modalTitle: '',
    firstButtonStyles: '',
    firstButtonHandler: NOOP,
    firstButtonTitle: '',
    secondButtonStyles: '',
    secondButtonHandler: NOOP,
    secondButtonTitle: '',
  }

  const [modalProperties, setModalProperties] = useState(initialModalProperties);

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

  function openDeleteTaskModal() {
    setModalProperties({
      modalTitle: 'Удалить задачу?',
      firstButtonStyles: styles.modalDeleteButton,
      firstButtonHandler: deleteTask,
      firstButtonTitle: 'Удалить',
      secondButtonStyles: styles.modalCancelButton,
      secondButtonHandler: () => setIsModalOpen(false),
      secondButtonTitle: 'Отмена',
    })
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
    changeTask();
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setValue(name);
        setIsEditable(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditable])

  // TODO Написать обработчик покидания инпута
  function handleBluer() {
    // Сравнить name и value
    // Если одинаковые закрыть редактирование
    if (name === value.trim()) {
      setIsEditable(false);
      return;
    }
    // Если нет - открываем модальное окно
    setModalProperties({
      modalTitle: 'Данные изменены!',
      firstButtonStyles: styles.modalDeleteButton,
      firstButtonHandler: changeTask,
      firstButtonTitle: 'Сохранить',
      secondButtonStyles: styles.modalCancelButton,
      secondButtonHandler: cancelChangeTask,
      secondButtonTitle: 'Отмена',
    })
    setIsModalOpen(true);
  }

  function changeTask() {
    dispatch(changeNameTask({id, value}));
    setIsModalOpen(false);
    setIsEditable(false);
  }

  function cancelChangeTask() {
    setValue(name);
    setIsModalOpen(false);
    setIsEditable(false);
  }

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
              onBlur={handleBluer}
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
              onClick={openDeleteTaskModal}
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
            <Text As={'h2'} size={24} lineHeight={17}>{modalProperties.modalTitle}</Text>
            <Break size={25} top/>
            <button
              className={modalProperties.firstButtonStyles}
              onClick={modalProperties.firstButtonHandler}
            >
              <Text size={16} lineHeight={17} weight={EWeight.medium}
                    color={EColors.white}>{modalProperties.firstButtonTitle}</Text>
            </button>
            <Break size={20} top/>
            <button
              className={modalProperties.secondButtonStyles}
              onClick={modalProperties.secondButtonHandler}
            >
              <Text size={16} lineHeight={17} weight={EWeight.light}
                    color={EColors.black}>{modalProperties.secondButtonTitle}</Text>
            </button>
          </div>
        </Modal>
      </Portal>
    </li>
  );
}
