import React, {useEffect, useState} from 'react';
import styles from './timer.module.css';
import {EColors, EWeight, Text} from '../../Text';
import {Break} from '../../Break';
import {EIcons, Icon} from '../../Icon';
import {Button, EButtonColors} from '../../Button';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {showTime} from '../../../utils/timeutiltties';
import {increaseTime} from '../../../store/tasksSlice';
import {pauseTimer, startTimer } from "../../../store/statesSlice";

export function Timer() {
  const dispatch = useAppDispatch();
  const { taskTime } = useAppSelector(state => state.settings);
  const tasks = useAppSelector(state => state.tasks.tasks);
  // В переменную записываем заначение счетчика Timer
  const [timer, setTimer] = useState(0);

  // Нет задач
  const isTasks = tasks.length !== 0;
  // console.log(isTasks);

  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);

  const timerString = isTasks ? showTime(sortTasks[0].time - timer) : showTime(taskTime);

  const taskName = isTasks ? sortTasks[0].name : 'Задач нет';
  // console.log(taskName);

  const taskCount = isTasks ? `Помидор ${sortTasks[0].count}` : 'Помидор';
  // console.log(taskCount);

  function handleAddTime() {
    dispatch(increaseTime(sortTasks[0].id))
  }


  // Логика работы таймера
  // В states состояние App
  const states = useAppSelector(state => state.states);



  // Запустк Таймера
  useEffect(() => {
    let timerId: NodeJS.Timer;
    if(states.isStarted) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(timerId);
  }, [states.isStarted])

  console.log(timer);

  // Старт таймера
  function handleLeftButton() {
    // console.log('clicked')
    if(states.isStarted) {
      dispatch(startTimer(false));
      dispatch(pauseTimer(true));
    } else if(states.onPause) {
      dispatch(startTimer(true));
      dispatch(pauseTimer(false));
    } else {
      dispatch(startTimer(true));
    }
  }

  function handleRightButton() {
    dispatch(startTimer(false));
    // dispatch()
    setTimer(0); //Обнулили счетчик
  }



  return (
    <>
      <div className={styles.header}>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>{taskName}</Text>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>{taskCount}</Text>
      </div>
      <div className={styles.body}>

        <div className={styles.timerBox}>
          <Text As="span" size={150} lineHeight={179} weight={EWeight.extraLight} color={EColors.grey33}>
            {timerString ? timerString : 'Нет задач'}</Text>
          <button
            className={styles.addBtnBox}
            onClick={handleAddTime}
            disabled={!isTasks}
          >
            <Icon name={EIcons.add} size={50}></Icon>

          </button>
        </div>

        <p>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey99}>Задача 1 -</Text>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey33}>{taskName}</Text>
        </p>

        <Break size={35} top />

        <div className={styles.btnsBox}>
          <Button
            type={'button'}
            disabled={!isTasks}
            onClick={handleLeftButton}
          >
            <Text size={16} lineHeight={17} color={EColors.white} weight={EWeight.medium}>Старт</Text>
          </Button>

          <Break size={25} inline />

          <Button
            type={'button'}
            color={EButtonColors.grey}
            notBackground={true}
            disabled={!isTasks}
            onClick={handleRightButton}
          >
            <Text size={16} lineHeight={17} color={EColors.greyC4} weight={EWeight.medium}>Стоп</Text>
          </Button>


        </div>
      </div>
    </>
  );
}
