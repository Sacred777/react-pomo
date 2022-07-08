import React from 'react';
import {IStatisticsPageProps, StatisticsPage} from "./StatisticsPage";
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

  function getPersentFromSeconds(seconds: number) {
    return (Math.round((seconds * 90) / (stepOfLevels * 5))).toString();
  }

  // Получаем данные за конкретный день
  function getStatForDay(numberOfWeek: number) {
    return currentWeekStat.find((item) => item.dayOfTheWeek === numberOfWeek);
  }

  // TODO По кнопке меняем данные этого объекта
  const statForToday = getStatForDay(getRusDayOfWeek(today));
  console.log(statForToday);

  const props: IStatisticsPageProps = {
    dayOfWeek: (
      statForToday
        ? getFullNameOfDayOfWeek(statForToday.dayOfTheWeek - 1)
        : getFullNameOfDayOfWeek(getRusDayOfWeek(today) - 1)
    ),
    workingOnTaskTime: (
      statForToday
        ? getStringOfSecondsHHMM(statForToday.pomodoroTime)
        : ''
    ),
    pomodoroCount: (
      statForToday
        ? statForToday.pomodoroCount
        : 0
    ),
    focusPercents: (
      statForToday
        ? Math.round(statForToday.pomodoroTime * 100 / statForToday.timerTime).toString() + '%'
        : '0%'
    ),
    pauseTime: (
      statForToday
        ? getStringOfSecondsNS(statForToday.pauseTime)
        : '0c'
    ),
    // '14м',
    stopCount: (
      statForToday
        ? statForToday.stopCount.toString()
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
