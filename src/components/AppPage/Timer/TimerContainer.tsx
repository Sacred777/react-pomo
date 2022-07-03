import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {getDateStringYYYYMMDD, getNumberOfWeek, showTime} from '../../../utils/timeutiltties';
import {decreaseCount, increaseTime, removeTask} from '../../../store/tasksSlice';
import {breakTimer, pauseBreakTimer, pauseTimer, setInitialState, startTimer} from "../../../store/statesSlice";
import {EWindowTypes, Timer} from './Timer';
import {
  changeStat,
  cleanLastLongBreakPomodoroCount,
  createStat, increaseLastLongBreakPomodoroCount,
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
  const currentTask = [...tasks].sort((prev, current) => prev.id - current.id)[0];

  useEffect(() => {
    setSecondsLeft(isTasks ? currentTask.time : settingsInfo.taskTime);
  }, [tasks])

  //TODO заменить все sortTask на currentTask
  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);
  // Если есть задачи, берем время на их помидор
  // setSecondsLeft(isTasks ? sortTasks[0].time : 0);
  // Получаем название задачи из массива
  const taskName = isTasks ? sortTasks[0].name : 'Нет задач';
  // Ф-ция увеличения значения счётчика с шагом в 1 минуту
  function handleAddTime() {
    dispatch(increaseTime(sortTasks[0].id));
    // setSecondsLeft((prevState) => prevState + 60);
  }

  // TODO Получаем из stat статистику текущего дня
  const [currentDateStat] = stats.filter((item) => item.date === currentDateStringYYYYMMDD);
  const isCurrentDateStat = currentDateStat !== undefined;
  // console.log('date', isCurrentDateStat);
  let pomodoroCount = isCurrentDateStat ? currentDateStat.pomodoroCount : 0;
  let taskNumber = isCurrentDateStat ? currentDateStat.taskCount : 0;
  // Если есть задачи, текущее значение увеличиваем на 1
  pomodoroCount = isTasks ? pomodoroCount + 1 : pomodoroCount;
  taskNumber = isTasks ? taskNumber + 1 : taskNumber;

  // console.log(secondsLeft);
  // console.log(isTasks);
  // const currentTaskTime = currentTask ? currentTask.time : 0;
  // console.log(currentTaskTime);
  // console.log(secondsLeft);

  // useEffect(() => {
  //   function switchMode() {
  //     let nextTime = 0;
  //     if(states.isStarted) {
  //       nextTime = settingsInfo.shortBreakTime;
  //       if(isCurrentDateStat && (currentDateStat.lastLongBreakPomodoroCount >= settingsInfo.longBreakCycle)) {
  //         nextTime = settingsInfo.longBreakTime;
  //         dispatch(cleanLastLongBreakPomodoroCount(currentDateStringYYYYMMDD));
  //       } else {
  //         dispatch(increaseLastLongBreakPomodoroCount(currentDateStringYYYYMMDD));
  //       }
  //       dispatch(startTimer(false))
  //       dispatch(breakTimer(true));
  //       setSecondsLeft(nextTime);
  //     } else {
  //       nextTime = settingsInfo.taskTime;
  //       dispatch(startTimer(true))
  //       dispatch(breakTimer(false));
  //     }
  //
  //     setSecondsLeft(nextTime);
  //   }
  //
  //  const intervalID = setInterval(() => {
  //    if (!states.isStarted || !states.isBreak) {
  //      return
  //    }
  //
  //    if(states.onPause || states.onBreakPause) {
  //      return
  //    }
  //
  //    if(secondsLeft === 0) {
  //      return switchMode();
  //    }
  //    setSecondsLeft((seconds) => seconds - 1);
  //   }, 1000)
  //
  //   return () => clearInterval(intervalID);
  // }, [states, stats, secondsLeft, settingsInfo, isCurrentDateStat, currentDateStat])
  //
  // console.log(secondsLeft);










  // Логика работы таймера
  // В states состояние App


  // Запустк Таймера
  // useEffect(() => {
  //   let timerId: NodeJS.Timer;
  //   if(states.isStarted) {
  //     timerId = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1)
  //     }, 1000)
  //   }
  //   return () => clearInterval(timerId);
  // }, [states.isStarted])

  // // Запуск Таймера Паузы
  // useEffect(() => {
  //   let timerId: NodeJS.Timer;
  //   if(states.onPause) {
  //     timerId = setInterval(() => {
  //       setPauseTime((prevPauseTime) => prevPauseTime + 1)
  //     }, 1000)
  //   }
  //   return () => clearInterval(timerId);
  // }, [states.onPause]);
  // // console.log(pauseTime);

  // // Запуск Таймера Перерыва
  // useEffect(() => {
  //   let timerId: NodeJS.Timer;
  //   if(states.isBreak) {
  //     timerId = setInterval(() => {
  //       setBreakTime((prevBreakTime) => prevBreakTime + 1)
  //     }, 1000)
  //   }
  //   return () => clearInterval(timerId);
  // }, [states.isBreak]);
  // // console.log(breakTime);



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
          timerTime: sortTasks[0].time - secondsLeft + pauseSeconds,
          pauseTime: pauseSeconds,
          stopCount: 1,
        }
        // Записываем статистику
        dispatch(changeStat(newStat));
        // Установить время secondsLeft = время задачи
        setSecondsLeft(sortTasks[0].time);
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
        if(sortTasks.length > 1 || sortTasks[0].count > 1) {
          // Записать статистику
          console.log("Запись статистики. Есть ещё помидоры");
          const newStat = {
            ...statDataTemplate,
            timerTime: sortTasks[0].time - secondsLeft + pauseSeconds,
            pomodoroTime: sortTasks[0].time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: sortTasks[0].count === 1 ? 1 : 0 ,
            lastLongBreakPomodoroCount: 1,
          }
          console.log(newStat);
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
          console.log("Запись статистики. Нет помидоров")
          const newStat = {
            ...statDataTemplate,
            timerTime: sortTasks[0].time - secondsLeft + pauseSeconds,
            pomodoroTime: sortTasks[0].time - secondsLeft,
            pauseTime: pauseSeconds,
            pomodoroCount: 1,
            taskCount: sortTasks[0].count === 1 ? 1 : 0 ,
            // lastLongBreakPomodoroCount: 1,
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
        console.log("Запись статистики. Пауза")
        const newStat = {
          ...statDataTemplate,
          //TODO Подумать как фиксировать время
          timerTime: breakSeconds,
          // lastLongBreakPomodoroCount: 1,
        }
        dispatch(changeStat(newStat));
        setSecondsLeft(sortTasks[0].time);
        setBreakSeconds(0);
        dispatch(startTimer(true));
      }
    }

    const intervalID = setInterval(() => {
      console.log('isPomodoroDone', isChangedMode);
      if(secondsLeft === 0 || isChangedMode) {
        console.log('Смена моды')
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

  // console.log(typeOfWindow);

  function getNextBreakSeconds() {
    if(isCurrentDateStat) {
      // console.log('Расчет перерыва')
      const isLongBreak = settingsInfo.longBreakCycle === currentDateStat.lastLongBreakPomodoroCount + 1;
      // console.log('isLongBreak', isLongBreak);
      // console.log()
      const breakDuration = isLongBreak ? settingsInfo.longBreakTime : settingsInfo.shortBreakTime;
      // console.log('breakDuration', breakDuration);
      if(isLongBreak) {
        dispatch(cleanLastLongBreakPomodoroCount(currentDateStringYYYYMMDD))
      }
      return breakDuration;
    } else {
      return settingsInfo.shortBreakTime;
    }
  }

  function setFinishedPomodoro() {
    // console.log('function');
    if (sortTasks[0].count > 1) {
      dispatch(decreaseCount(sortTasks[0].id));
    } else {
      dispatch(removeTask(sortTasks[0].id));
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
