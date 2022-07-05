import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {getDateStringYYYYMMDD, getNumberOfWeek, showTime} from '../../../utils/timeutiltties';
import {decreaseCount, increaseTime, removeTask} from '../../../store/tasksSlice';
import {breakTimer, pauseBreakTimer, pauseTimer, setInitialState, startTimer} from "../../../store/statesSlice";
import {EWindowTypes, Timer} from './Timer';
import {
  changeStat,
  cleanLastLongBreakPomodoroCount,
  createStat,
  TShortStat,
  TStat
} from "../../../store/statSlice";
import getShortStatDataTemplate from "../../../utils/getStatObjects";

export function TimerContainer() {
  const dispatch = useAppDispatch();
  const settingsInfo = useAppSelector(state => state.settings);
  const tasks = useAppSelector(state => state.tasks.tasks);
  const states = useAppSelector(state => state.states);
  const stats = useAppSelector(state => state.stat.stat);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [pauseSeconds, setPauseSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isChangedMode, setIsChangedMode] = useState(false);

  const currentDate = new Date();
  const currentDateStringYYYYMMDD = getDateStringYYYYMMDD(currentDate);

  // Шаблон для объекта данных статистики
  const statDataTemplate: TShortStat = getShortStatDataTemplate(currentDate);

  // Есть ли задачи для выполнения?
  const isTasks = tasks.length !== 0;
  // Сортировка массива дел старое сверху
  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);
  const currentTask = sortTasks[0];
  // Если задача поменялась, в стэйт нужны свежие данные
  useEffect(() => {
    setSecondsLeft(isTasks ? currentTask.time : settingsInfo.taskTime);
  }, [tasks])
  // Получаем название задачи из массива
  const taskName = isTasks ? currentTask.name : 'Нет задач';

  // Ф-ция увеличения значения счётчика с шагом в 1 минуту
  function handleAddTime() {
    dispatch(increaseTime(currentTask.id));
  }

  // Получаем из stat статистику текущего дня
  const [currentDateStat] = stats.filter((item) => item.date === currentDateStringYYYYMMDD);
  const isCurrentDateStat = currentDateStat !== undefined;
  let pomodoroCount = isCurrentDateStat && isTasks ? currentDateStat.pomodoroCount + 1 : 0;
  let taskNumber = isCurrentDateStat && isTasks? currentDateStat.taskCount +1 : 0;


  // Определение типа окна исходя из states
  let typeOfWindow: EWindowTypes;

  if(states.isStarted) {
    typeOfWindow = EWindowTypes.starting;
  } else if (states.onPause) {
    typeOfWindow = EWindowTypes.pausing;
  } else if (states.isBreak) {
    typeOfWindow = EWindowTypes.breaking
  } else if (states.onBreakPause) {
    typeOfWindow = EWindowTypes.breakPausing;
  } else {
    typeOfWindow = EWindowTypes.initial;
  }

  function handleLeftButton() {
    switch (typeOfWindow) {
      case EWindowTypes.initial:  // Старт
        // Создаём статистику текущего дня
        if(!isCurrentDateStat) {
          createCurrentDayStat();
        }
        dispatch(startTimer(true));
        break
      case EWindowTypes.starting: // Пауза
        dispatch(pauseTimer(true));
        break
      case EWindowTypes.pausing: // Продолжить
        dispatch(startTimer(true));
        break
      case EWindowTypes.breaking: // Пауза
        dispatch(pauseBreakTimer(true));
        break
      case EWindowTypes.breakPausing: // Продолжить
        dispatch(breakTimer(true));
        break
    }
  }

  function handleRightButton() {
    switch (typeOfWindow) {
      case EWindowTypes.initial: // Стоп неактивная
        break
      case EWindowTypes.starting: // Стоп активная
        // Записать состояние
          // Время работы таймера. Разница между временем задачи и оставшегося времени по счетчику
          // Время паузы
          // Увеиличить StopCount
        const newStat = {
          ...statDataTemplate,
          timerTime: currentTask.time - secondsLeft + pauseSeconds,
          pauseTime: pauseSeconds,
          stopCount: 1,
        }
        // Записываем статистику
        dispatch(changeStat(newStat));
        // Установить время secondsLeft = время задачи
        setSecondsLeft(currentTask.time);
        // Обнулить pauseSeconds
        setPauseSeconds(0);
        // Установить таймер в false
        dispatch(startTimer(false));
        break
      case EWindowTypes.pausing: // Сделано
        dispatch(startTimer(true));
        setIsChangedMode(true);
        break
      case EWindowTypes.breaking: // Пропустить
        dispatch(breakTimer(true));
        setIsChangedMode(true);
        break
      case EWindowTypes.breakPausing: // Пропустить
        dispatch(breakTimer(true));
        setIsChangedMode(true);
        break
    }
  }

  function createCurrentDayStat() {
    // Готовим объект
    const stat: TStat = {
      ...statDataTemplate,
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      dayOfTheWeek: currentDate.getDay(),
      week: getNumberOfWeek(currentDate),
    }
    dispatch(createStat(stat));
  }

  useEffect(() => {
    if(!states.isStarted && !states.isBreak) {
      return
    }

    function switchMode() {
      setIsChangedMode(false);
      if(states.isStarted) {
        //Если ещё несколько задач или помидоров
        if(sortTasks.length > 1 || currentTask.count > 1) {
          // Записать статистику
          const newStat = {
            ...statDataTemplate,
            timerTime: currentTask.time - secondsLeft + pauseSeconds,
            pomodoroTime: currentTask.time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: currentTask.count === 1 ? 1 : 0 ,
            lastLongBreakPomodoroCount: 1,
          }
          dispatch(changeStat(newStat));
          // Удалить помидор или задачу
          setFinishedPomodoro();
          // Определить время перерыва (записать в secondLeft)
          const nextBreakSeconds = getNextBreakSeconds();
          setSecondsLeft(nextBreakSeconds);
          setBreakSeconds(nextBreakSeconds);
          // Сброс счетчика паузы
          setPauseSeconds(0);
          // Поменять состояние на Break
          dispatch(breakTimer(true));
        } else {
          const newStat = {
            ...statDataTemplate,
            timerTime: currentTask.time - secondsLeft + pauseSeconds,
            pomodoroTime: currentTask.time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: currentTask.count === 1 ? 1 : 0 ,
          }
          // Записываем статистику
          dispatch(changeStat(newStat));
          // Обнуляем счетчик перерывов
          dispatch(cleanLastLongBreakPomodoroCount(currentDateStringYYYYMMDD));
          setFinishedPomodoro();
          // Сброс счетчика паузы
          setPauseSeconds(0);
          // Состояние в исходное положение
          dispatch(setInitialState(true));
        }
      } else if(states.isBreak) {
        //Обновляем статистику
        const newStat = {
          ...statDataTemplate,
          timerTime: breakSeconds,
        }
        dispatch(changeStat(newStat));
        setSecondsLeft(currentTask.time);
        setBreakSeconds(0);
        dispatch(startTimer(true));
      }
    }

    const intervalID = setInterval(() => {
      if(secondsLeft === 0 || isChangedMode) {
        return switchMode();
      }
      setSecondsLeft((prevState) => prevState - 1);
    }, 100)

    return () => clearInterval(intervalID);
  }, [states, secondsLeft, breakSeconds, isChangedMode])


  // Счётчик Паузы
  useEffect(() => {
    if(!states.onPause) {
      return
    }
    const intervalID = setInterval(() => {
     setPauseSeconds((prevState) => (prevState) + 1);
    }, 1000)

    return () => clearInterval(intervalID);
  }, [states])


  function getNextBreakSeconds() {
    if(isCurrentDateStat) {
      const isLongBreak = settingsInfo.longBreakCycle === currentDateStat.lastLongBreakPomodoroCount + 1;
      const breakDuration = isLongBreak ? settingsInfo.longBreakTime : settingsInfo.shortBreakTime;
      if(isLongBreak) {
        dispatch(cleanLastLongBreakPomodoroCount(currentDateStringYYYYMMDD))
      }
      return breakDuration;
    } else {
      return settingsInfo.shortBreakTime;
    }
  }

  function setFinishedPomodoro() {
    if (currentTask.count > 1) {
      dispatch(decreaseCount(currentTask.id));
    } else {
      dispatch(removeTask(currentTask.id));
    }
  }

  return (
    <>
      <Timer
        windowType={typeOfWindow}
        taskName={taskName}
        pomodoroCount={pomodoroCount}
        timerDigits={showTime(secondsLeft)}
        handleAddTime={handleAddTime}
        isAddButtonDisabled={!isTasks && typeOfWindow === EWindowTypes.initial}
        taskNumber={taskNumber}
        handleLeftButtonClick={handleLeftButton}
        handleRightButtonClick={handleRightButton}
        isLeftButtonDisabled={!isTasks && typeOfWindow === EWindowTypes.initial}
        isRightButtonDisabled={typeOfWindow === EWindowTypes.initial}
      />
    </>
  );
}
