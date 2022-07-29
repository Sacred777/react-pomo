import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {
  getDateStringYYYYMMDD,
  getNumberOfWeekSince01011970,
  getRusDayOfWeek,
  showTime
} from '../../../utils/timeutiltties';
import {changeTime, decreaseCount, increaseTime, removeTask, startTiming} from '../../../store/tasksSlice';
import {breakTimer, pauseBreakTimer, pauseTimer, setInitialState, startTimer} from "../../../store/statesSlice";
import {EWindowTypes, Timer} from './Timer';
import {
  changeStat,
  cleanLastLongBreakPomodoroCount,
  createStat,
  TShortStat,
} from "../../../store/statSlice";
import getShortStatDataTemplate from "../../../utils/getStatObjects";
import {useLocalStorageUpdate} from "../../../hooks/useLocalStorageUpdate";
import {TStat} from "../../../models/statObject";

export function TimerContainer() {
  const dispatch = useAppDispatch();

  // Ключи для Local Storage
  const LS_SECONDS_LEFT_KEY = 'sl';
  const LS_PAUSE_SECONDS_KEY = 'ps';
  const LS_BREAK_SECONDS_KEY = 'bs';
  const LS_NUMBER_OF_RUNNING_POMODORO_KEY = 'nrp';

  const TIMER_INCREMENT_STEP = 60;

  const settingsInfo = useAppSelector(state => state.settings);
  const tasks = useAppSelector(state => state.tasks.tasks);
  const states = useAppSelector(state => state.states);
  const stats = useAppSelector(state => state.stat.stat);

  const [secondsLeft, setSecondsLeft] = useState(Number(localStorage.getItem(LS_SECONDS_LEFT_KEY)) ?? 0);
  const [pauseSeconds, setPauseSeconds] = useState(Number(localStorage.getItem(LS_PAUSE_SECONDS_KEY)) ?? 0);
  const [breakSeconds, setBreakSeconds] = useState(Number(localStorage.getItem(LS_BREAK_SECONDS_KEY)) ?? 0);
  const [isChangedMode, setIsChangedMode] = useState(false);
  const [numberOfRunningPomodoro, setNumberOfRunningPomodoro] = useState(Number(localStorage.getItem(LS_NUMBER_OF_RUNNING_POMODORO_KEY)) ?? 0);

  // Обновление Local Storage при изменении состояния компонента
  useLocalStorageUpdate(LS_SECONDS_LEFT_KEY, secondsLeft);
  useLocalStorageUpdate(LS_PAUSE_SECONDS_KEY, pauseSeconds);
  useLocalStorageUpdate(LS_BREAK_SECONDS_KEY, breakSeconds);
  useLocalStorageUpdate(LS_NUMBER_OF_RUNNING_POMODORO_KEY, numberOfRunningPomodoro);

  const currentDate = new Date();
  const currentDateStringYYYYMMDD = getDateStringYYYYMMDD(currentDate);

  // Шаблон для объекта данных статистики
  const statDataTemplate: TShortStat = getShortStatDataTemplate(currentDate);

  // Есть ли задачи для выполнения?
  const isTasks = tasks.length !== 0;
  // Сортировка массива дел старое сверху
  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);
  const currentTask = sortTasks[0];
  // Получаем название задачи
  const taskName = isTasks ? currentTask.name : 'Нет задач';

  // Сброс значений счетчика при обновлении задач
  useEffect(() => {
    if (isTasks) {
      if (!currentTask.isTiming) setNumberOfRunningPomodoro(1);
    } else {
      setNumberOfRunningPomodoro(0);
    }
  }, [isTasks])

  // Обновление времени помидоров при изменении настроек (кроме задачи которая выполняется)
  useEffect(() => {
    if (isTasks) {
      sortTasks.forEach((task) => {
        if (!currentTask.isTiming) dispatch(changeTime({id: task.id, value: settingsInfo.taskTime}));
      })
      if (!states.isStarted && !states.isBreak && !states.onPause && !states.onBreakPause) {
        setSecondsLeft(settingsInfo.taskTime);
      }
    }
  }, [settingsInfo])

  // Если задача поменялась или настройки изменены, для таймера нужны свежие данные
  useEffect(() => {
    if (isTasks && secondsLeft) return;
    setSecondsLeft(isTasks ? currentTask.time : settingsInfo.taskTime);
  }, [tasks, settingsInfo])

  // Ф-ция увеличения значения счётчика
  function handleAddTime() {
    setSecondsLeft((prevState) => prevState + TIMER_INCREMENT_STEP);
    !states.isBreak && dispatch(increaseTime(currentTask.id));
  }

  // Получаем из stat статистику текущего дня
  const [currentDateStat] = stats.filter((item) => item.date === currentDateStringYYYYMMDD);
  const isCurrentDateStat = currentDateStat !== undefined;
  let taskNumber = isCurrentDateStat && isTasks ? currentDateStat.taskCount + 1 : 0;

  // Определение типа окна исходя из stats
  let typeOfWindow: EWindowTypes;

  if (states.isStarted) {
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
        if (!isCurrentDateStat) {
          createCurrentDayStat();
        }
        dispatch(startTimer(true));
        dispatch(startTiming({id: currentTask.id, value: true}));
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
        const newStat = {
          ...statDataTemplate,
          timerTime: currentTask.time - secondsLeft + pauseSeconds,
          pauseTime: pauseSeconds,
          stopCount: 1,
        }
        dispatch(changeStat(newStat));
        setSecondsLeft(currentTask.time);
        setPauseSeconds(0);
        dispatch(startTimer(false));
        dispatch(startTiming({id: currentTask.id, value: false}));
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
    const stat: TStat = {
      ...statDataTemplate,
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      dayOfTheWeek: getRusDayOfWeek(currentDate),
      week: getNumberOfWeekSince01011970(currentDate),
    }
    dispatch(createStat(stat));
  }

  useEffect(() => {
    if (!states.isStarted && !states.isBreak) {
      return
    }

    function switchMode() {
      setIsChangedMode(false);
      if (states.isStarted) {
        //Если ещё несколько задач или помидоров
        if (sortTasks.length > 1 || currentTask.count > 1) {
          const newStat = {
            ...statDataTemplate,
            timerTime: currentTask.time - secondsLeft + pauseSeconds,
            pomodoroTime: currentTask.time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: currentTask.count === 1 ? 1 : 0,
            lastLongBreakPomodoroCount: 1,
          }
          dispatch(changeStat(newStat));
          setFinishedPomodoro();
          const nextBreakSeconds = getNextBreakSeconds();
          setSecondsLeft(nextBreakSeconds);
          setBreakSeconds(nextBreakSeconds);
          setPauseSeconds(0);
          dispatch(breakTimer(true));
          dispatch(startTiming({id: currentTask.id, value: false}));
        } else {
          const newStat = {
            ...statDataTemplate,
            timerTime: currentTask.time - secondsLeft + pauseSeconds,
            pomodoroTime: currentTask.time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: currentTask.count === 1 ? 1 : 0,
          }
          dispatch(changeStat(newStat));
          dispatch(cleanLastLongBreakPomodoroCount(currentDateStringYYYYMMDD));
          setFinishedPomodoro();
          setPauseSeconds(0);
          dispatch(setInitialState(true));
        }
      } else if (states.isBreak) {
        const newStat = {
          ...statDataTemplate,
          timerTime: breakSeconds,
        }
        dispatch(changeStat(newStat));
        setSecondsLeft(currentTask.time);
        setBreakSeconds(0);
        dispatch(startTimer(false));
      }
    }

    const intervalID = setInterval(() => {
      if (secondsLeft === 0 || isChangedMode) {
        return switchMode();
      }
      setSecondsLeft((prevState) => prevState - 1);
    }, 100)

    return () => clearInterval(intervalID);
  }, [states, secondsLeft, breakSeconds, isChangedMode])


  // Счётчик Паузы
  useEffect(() => {
    if (!states.onPause) {
      return
    }
    const intervalID = setInterval(() => {
      setPauseSeconds((prevState) => (prevState) + 1);
    }, 1000)

    return () => clearInterval(intervalID);
  }, [states])


  function getNextBreakSeconds() {
    if (isCurrentDateStat) {
      const isLongBreak = settingsInfo.longBreakCycle === currentDateStat.lastLongBreakPomodoroCount + 1;
      const breakDuration = isLongBreak ? settingsInfo.longBreakTime : settingsInfo.shortBreakTime;
      if (isLongBreak) {
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
      setNumberOfRunningPomodoro((prevState) => ++prevState);
    } else {
      dispatch(removeTask(currentTask.id));
      setNumberOfRunningPomodoro(1);
    }
  }

  return (
    <>
      <Timer
        windowType={typeOfWindow}
        taskName={taskName}
        pomodoroCount={numberOfRunningPomodoro}
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
