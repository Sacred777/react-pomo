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

export function TimerContainer() {
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
      <Timer />
    </>
  );
}
