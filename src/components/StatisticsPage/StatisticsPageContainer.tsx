import React, {ReactEventHandler, useEffect, useState} from 'react';
import {IStatForButton, IStatisticsPageProps, StatisticsPage} from "./StatisticsPage";
import {useAppSelector} from "../../hooks/reduxHooks";
import {
  getFullNameOfDayOfWeek,
  getNumberOfWeekSince01011970,
  getRusDayOfWeek, getStringOfSecondsHHMM, getStringOfSecondsNS,
  secondsToString
} from "../../utils/timeutiltties";

const StatisticsPageContainer = () => {
  const stat = useAppSelector(state => state.stat.stat);
  const today = new Date();
  const [dayOfWeekForDisplay, setDayOfWeekForDisplay] = useState((getRusDayOfWeek(today)));
  // let statForDay = getStatForDay(getRusDayOfWeek(today));
  // console.log(statForDay);
  console.log(dayOfWeekForDisplay);

  const currentNumberOfWeek = getNumberOfWeekSince01011970(today);
  console.log(currentNumberOfWeek);
  console.log(stat);

  const currentWeekStat = stat.filter((item) => item.week === currentNumberOfWeek);
  console.log(currentWeekStat);

  // Получаем шаг для градаций времени на графике
  const maxPomodoroTime = currentWeekStat.reduce((prev, current) => prev.pomodoroTime > current.pomodoroTime ? prev : current).pomodoroTime;
  const stepOfLevels = Math.ceil(maxPomodoroTime / 300) * 60;
  // console.log(secondsToString(stepOfLevels));

  // Отрисовка графика
  // const sortCurrentWeekStat = [...currentWeekStat].sort((prev, current) => prev.dayOfTheWeek - current.dayOfTheWeek);
  // console.log(sortCurrentWeekStat);
  // понедельник
  const pomodoroLevel = [];
  for (let i = 0; i <= 6; i++) {
    const result = currentWeekStat.find((item) => item.dayOfTheWeek === i + 1);
    pomodoroLevel[i] = result ? getPersentFromSeconds(result.pomodoroTime) + '%' : '';
  }

  // useEffect(() => {
  //   setStatForDay(getStatForDay(getRusDayOfWeek(today)));
  // },[])

  // let statForDay = getStatForDay(getRusDayOfWeek(today));
  let statForDay = getStatForDay(dayOfWeekForDisplay);
  console.log(statForDay);

  const changeStatDay: ReactEventHandler<HTMLButtonElement> = (event) => {
    //TODO нужно типизировать почемут пишет нет id
    //@ts-ignore
    console.log(event.target.id);
    // @ts-ignore
    // statForDay = getStatForDay(event.target.id);
    setDayOfWeekForDisplay(+event.target.id);
  }

  const statForButtons = [];
  const rusShortNameOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  for (let i = 0; i <= 6; i++) {
    const findedData = currentWeekStat.find((item) => item.dayOfTheWeek === i + 1);
    const objOfData: IStatForButton = {
      key: findedData ? findedData.dayOfTheWeek : i + 1,
      name: rusShortNameOfWeek[i],
      level: findedData ? getPersentFromSeconds(findedData.pomodoroTime) + '%' : '',
      // onClick: changeStatDay(findedData ? findedData.dayOfTheWeek : i + 1),
      onClick: changeStatDay,
    }
    statForButtons.push(objOfData);
  }

  console.log(statForButtons);


  function getPersentFromSeconds(seconds: number) {
    return (Math.round((seconds * 90) / (stepOfLevels * 5))).toString();
  }


  // Получаем данные за конкретный день
  function getStatForDay(numberOfWeek: number) {
    return currentWeekStat.find((item) => item.dayOfTheWeek === numberOfWeek);
  }

  // TODO По кнопке меняем данные этого объекта
  // let statForDay = getStatForDay(getRusDayOfWeek(today));
  // console.log(statForDay);

  // function changeStatDay: ReactEventHandler<HTMLButtonElement> (event) {
  //   // statForDay = getStatForDay(dayOfWeek)
  //   // const id
  //   console.log('клик');
  // }

  const props: IStatisticsPageProps = {
    // onClick: {changeStatDay},
    statForButtons,
    dayOfWeek: (
      statForDay
        ? getFullNameOfDayOfWeek(statForDay.dayOfTheWeek - 1)
        : getFullNameOfDayOfWeek(getRusDayOfWeek(today) - 1)
    ),
    workingOnTaskTime: (
      statForDay
        ? getStringOfSecondsHHMM(statForDay.pomodoroTime)
        : ''
    ),
    pomodoroCount: (
      statForDay
        ? statForDay.pomodoroCount
        : 0
    ),
    focusPercents: (
      statForDay
        ? Math.round(statForDay.pomodoroTime * 100 / statForDay.timerTime).toString() + '%'
        : '0%'
    ),
    pauseTime: (
      statForDay
        ? getStringOfSecondsNS(statForDay.pauseTime)
        : '0c'
    ),
    // '14м',
    stopCount: (
      statForDay
        ? statForDay.stopCount.toString()
        : '0'
    ),
    moButtonHeight: pomodoroLevel[0],
    tuButtonHeight: pomodoroLevel[1],
    weButtonHeight: pomodoroLevel[2],
    thButtonHeight: pomodoroLevel[3],
    frButtonHeight: pomodoroLevel[4],
    saButtonHeight: pomodoroLevel[5],
    suButtonHeight: pomodoroLevel[6],
    oneLineLevelValue: secondsToString(stepOfLevels),
    twoLineLevelValue: secondsToString(stepOfLevels * 2),
    threeLineLevelValue: secondsToString(stepOfLevels * 3),
    fourLineLevelValue: secondsToString(stepOfLevels * 4),
  }

  return (
    <>
      <StatisticsPage {...props}/>
    </>
  );
};

export default StatisticsPageContainer;