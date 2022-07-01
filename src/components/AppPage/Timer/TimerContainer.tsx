import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {getDateStringYYYYMMDD, getNumberOfWeek, showTime} from '../../../utils/timeutiltties';
import {decreaseCount, increaseTime, removeTask} from '../../../store/tasksSlice';
import {breakTimer, pauseBreakTimer, pauseTimer, startTimer} from "../../../store/statesSlice";
import {EWindowTypes, Timer} from './Timer';
import {addStop, changeStat, createStat, TShortStat, TStat} from "../../../store/statSlice";

export function TimerContainer() {
  const dispatch = useAppDispatch();
  const { taskTime, longBreakCycle, longBreakTime, shortBreakTime } = useAppSelector(state => state.settings);
  const tasks = useAppSelector(state => state.tasks.tasks);
  const stats = useAppSelector(state => state.stat.stat);

  const currentDate = new Date();
  const currentDateStringYYYYMMDD = getDateStringYYYYMMDD(currentDate);

  // Шаблон для объекта данных статистики
  const statDataTemplate: TShortStat = {
    date: currentDateStringYYYYMMDD,
    timerTime: 0,
    pomodoroTime: 0,
    pauseTime: 0,
    stopCount: 0,
    pomodoroCount: 0,
    taskCount: 0,
    lastBreakPomodoroCount: 0,
  }

  // Состояние счетчика Timer
  const [time, setTime] = useState(0);
  // Состояние счетчика Pause
  const [pauseTime, setPauseTime] = useState(0);
  // Состояние счетчика Break
  const [breakTime, setBreakTime] = useState(0);

  // Есть ли задачи для выполнения?
  const isTasks = tasks.length !== 0;
  // console.log(isTasks);


  // TODO Получаем из stat статистику текущего дня
  const [currentDateStat] = stats.filter((item) => item.date === currentDateStringYYYYMMDD);
  const isCurrentDateStat = currentDateStat !== undefined;
  // console.log('date', isCurrentDateStat);
  let pomodoroCount = isCurrentDateStat ? currentDateStat.pomodoroCount : 0;
  let taskNumber = isCurrentDateStat ? currentDateStat.taskCount : 0;
  // Если есть задачи, текущее значение увеличиваем на 1
  pomodoroCount = isTasks ? pomodoroCount + 1 : pomodoroCount;
  taskNumber = isTasks ? taskNumber + 1 : taskNumber;

  // Сортировка массива дел старое сверху
  const sortTasks = [...tasks].sort((prev, current) => prev.id - current.id);

  // Получаем строку таймера из его состояния
  const timerTime = isTasks ? sortTasks[0].time : 0;
  // let timerString = isTasks ? showTime(sortTasks[0].time - time) : showTime(taskTime);
  let timerString = isTasks ? showTime(timerTime - time) : showTime(taskTime);
  // Получаем название задачи из массива
  const taskName = isTasks ? sortTasks[0].name : 'Нет задач';

  // Ф-ция увеличения значения счётчика с шагом в 1 минуту
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
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(timerId);
  }, [states.isStarted])

  // Запуск Таймера Паузы
  useEffect(() => {
    let timerId: NodeJS.Timer;
    if(states.onPause) {
      timerId = setInterval(() => {
        setPauseTime((prevPauseTime) => prevPauseTime + 1)
      }, 1000)
    }
    return () => clearInterval(timerId);
  }, [states.onPause]);
  // console.log(pauseTime);

  // Запуск Таймера Перерыва
  useEffect(() => {
    let timerId: NodeJS.Timer;
    if(states.isBreak) {
      timerId = setInterval(() => {
        setBreakTime((prevBreakTime) => prevBreakTime + 1)
      }, 1000)
    }
    return () => clearInterval(timerId);
  }, [states.isBreak]);
  console.log(breakTime);

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
        dispatch(startTimer(false));
        dispatch(pauseTimer(true));
        break
      case EWindowTypes.pausing: // Продолжить
        dispatch(startTimer(true));
        dispatch(pauseTimer(false));
        break
      case EWindowTypes.breaking:
        break
      case EWindowTypes.breakPausing:
        break
    }
  }

  function handleRightButton() {
    switch (typeOfWindow) {
      case EWindowTypes.initial: // Стоп неактивная
        break
      case EWindowTypes.starting: // Стоп активная
        dispatch(startTimer(false));
        setTime(0); //Обнулили счетчик
        setPauseTime(0); //Обнулили счетчик
        dispatch(changeStat({
          ...statDataTemplate,
          timerTime: time + pauseTime,
          pomodoroTime: time,
          pauseTime: pauseTime,
          stopCount: 1,
        }))
        break
      case EWindowTypes.pausing: // Сделано
        dispatch(pauseTimer(false));
        setPomodoroIsDone(); // Здесь обнуление счётчиков, помидора (и задачи если нужно)
        break
      case EWindowTypes.breaking:
        break
      case EWindowTypes.breakPausing:
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
      // date: currentDateStringYYYYMMDD,
      // timerTime: 0,
      // pomodoroTime: 0,
      // pauseTime: 0,
      // stopCount: 0,
      // pomodoroCount: 0,
      // taskCount: 0,
      // lastBreakPomodoroCount: 0,
    }
    dispatch(createStat(stat));
  }

  // Помидор выполнен (Нажата кнопка "Сделано", Timer закончился)
  // Если помидор был последним - удаляем задачу
  function setPomodoroIsDone() {
    const isNotPomodoro = sortTasks[0].count - 1 === 0 ? true : false;
    // Готовим объект
    const stat: TShortStat = {
      ...statDataTemplate,
      // date: currentDateStringYYYYMMDD,
      timerTime: time + pauseTime,
      pomodoroTime: time,
      pauseTime: pauseTime,
      // stopCount: 0,
      pomodoroCount: 1,
      taskCount: isNotPomodoro ? 1 : 0,
      // lastBreakPomodoroCount: 0,
    };
      console.log(stat);
      dispatch(changeStat(stat)); // Обновляем данные


    // Обнуляем счётчики timer pauseTime
    setTime(0);
    setPauseTime(0);
    // Задиспатчить удаление помидара, а если помидоров у задачи нет - задачу
    dispatch(decreaseCount(sortTasks[0].id))
    console.log('уменьшаем помодоро')

    if(isNotPomodoro) {
      dispatch(removeTask(sortTasks[0].id));
    }
  }

  console.log('isTasks', isTasks);
  // console.log('sortTasks[0].time', sortTasks[0].time)
  console.log(timerTime);
  console.log(time);
  // console.log(sortTasks[0].time === time);
  if(time && timerTime === time) {
    console.log('сравняли');
    dispatch(startTimer(false));
    setPomodoroIsDone();
    // setTime(0);
  };
  // Порядок и логика выполнения
  // Если таймер закончился - записываем выполнение помидора
  // console.log(states.isStarted);
  // if(isTasks) {
  // if(states.isStarted) {
  //   if(time && (sortTasks[0].time === time)) {
  //     dispatch(startTimer(false))
  //     setPomodoroIsDone();
  //     console.log('isTasks', isTasks);
  //     console.log('elseTasks', tasks.length !== 0)
  //     // console.log('tasksCount', tasksCount);
  //     console.log('tasks', tasks);
  //     if(tasks.length !== 0) {
  //     // Проверяем какой должен быть перевыв
  //     // Делим state.pomodoroCount и settings.longBreakCycle если получается число без остатка - большой перерыв, иначе - маленький
  //     const breakTimeSettings = pomodoroCount % longBreakCycle === 0
  //     ? longBreakTime : shortBreakTime;
  //     console.log('Перерыв', breakTimeSettings);
  //     // Отключаем таймер
  //     dispatch(startTimer(false));
  //     // Включаем перерыв (запуск таймера)
  //     dispatch(breakTimer(true));
  //     // timerString = showTime(breakTimeSettings - breakTime);
  //     console.log(breakTimeSettings - breakTime);
  //     console.log('timerString', timerString)
  //     // Когда закончится перерыв, если есть ещё задачи
  //
  //     // выполняем помидор, если нет - initial windows
  //     }
  //   }



  // dispatch(breakTimer(true));
  // dispatch(pauseBreakTimer(true));
  // }

  return (
    <>
      <Timer
        windowType={typeOfWindow}
        taskName={taskName}
        pomodoroCount={pomodoroCount}
        timerDigits={timerString}
        handleAddTime={handleAddTime}
        taskNumber={taskNumber}
        handleLeftButtonClick={handleLeftButton}
        handleRightButtonClick={handleRightButton}
        isLeftButtonDisabled={!isTasks && typeOfWindow === EWindowTypes.initial}
        isRightButtonDisabled={typeOfWindow === EWindowTypes.initial}
      />
    </>
  );
}
