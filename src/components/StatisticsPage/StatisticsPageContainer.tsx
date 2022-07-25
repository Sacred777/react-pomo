import React, {useState} from 'react';
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
  // console.log(dayOfWeekForDisplay);

  const WEEKS_MENU = [{id: '0', name: 'Эта неделя'}, {id: '1', name: 'Прошедшая неделя'}, {id: '2', name: '2 недели назад'}];
  const [currentMenu, setCurrentMenu] = useState(WEEKS_MENU);
  // TODO возможно нужна просто переменная
  // const [weekIdNumber, setWeekIdNumber] = useState(0);
  const [currentNumberOfWeek, setCurrentNumberOfWeek] = useState(getNumberOfWeekSince01011970(today));
  console.log(currentNumberOfWeek);

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = +e.currentTarget.id;
    setCurrentNumberOfWeek(getNumberOfWeekSince01011970(today) - id);
    // console.log(id);
    const newWeeksMenu = WEEKS_MENU.slice(id).concat(WEEKS_MENU.slice(0, id));
    // console.log('ar', array);
    setCurrentMenu(newWeeksMenu);
  }

  // console.log(currentNumberOfWeek);
  // console.log(stat);

  const currentWeekStat = stat.filter((item) => item.week === currentNumberOfWeek);
  console.log(currentWeekStat);

  // Получаем шаг для шкалы времени на графике
  const maxPomodoroTime = currentWeekStat.length === 0 ? 4 : currentWeekStat.reduce((prev, current) => prev.pomodoroTime > current.pomodoroTime ? prev : current).pomodoroTime;
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

  let statForDay = getStatForDay(dayOfWeekForDisplay);
  // console.log(statForDay);

  const changeStatDay = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDayOfWeekForDisplay(+event.currentTarget.id);
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
      data: findedData ? 'notempty' : 'empty',
    }
    statForButtons.push(objOfData);
  }

  // console.log(statForButtons);


  function getPersentFromSeconds(seconds: number) {
    return (Math.round((seconds * 90) / (stepOfLevels * 5))).toString();
  }


  // Получаем данные за конкретный день
  function getStatForDay(numberOfWeek: number) {
    return currentWeekStat.find((item) => item.dayOfTheWeek === numberOfWeek);
  }

  // console.log(statForDay);

  const props: IStatisticsPageProps = {
    currentMenu,
    onClick: handleSelectClick,
    statForButtons,
    // isDataOfDay: statForDay ? true : false,
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
