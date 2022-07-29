import React, {useState} from 'react';
import {useAppSelector} from "../../hooks/reduxHooks";
import {
  getNumberOfWeekSince01011970,
  getRusDayOfWeek,
} from "../../utils/timeutiltties";
import styles from "./statisticspage.module.css";
import {EWeight, Text} from "../Text";
import {WeeksSelect} from "./WeeksSelect";
import {LeftDashboard} from "./LeftDashboard";
import {statObject} from "../../models/statObject";
import {BottomDashboard} from "./BottomDashboard";
import {Chart} from "./Chart";

const StatisticsPage = () => {
  const WEEKS_MENU = [{id: '0', name: 'Эта неделя'}, {id: '1', name: 'Прошедшая неделя'}, {
    id: '2',
    name: '2 недели назад'
  }];

  const stat = useAppSelector(state => state.stat.stat);
  const today = new Date();
  const [dayOfWeekForDisplay, setDayOfWeekForDisplay] = useState((getRusDayOfWeek(today)));
  const [currentMenu, setCurrentMenu] = useState(WEEKS_MENU);
  const [currentNumberOfWeek, setCurrentNumberOfWeek] = useState(getNumberOfWeekSince01011970(today));

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = +e.currentTarget.id;
    setCurrentNumberOfWeek(getNumberOfWeekSince01011970(today) - id);
    const newWeeksMenu = WEEKS_MENU.slice(id).concat(WEEKS_MENU.slice(0, id));
    setCurrentMenu(newWeeksMenu);
  }

  const currentWeekStat = stat.filter((item) => item.week === currentNumberOfWeek);

  let statForDay = {...statObject, ...getStatForDay(dayOfWeekForDisplay)};

  const changeStatDay = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDayOfWeekForDisplay(+event.currentTarget.id);
  }

  // Получаем данные за конкретный день
  function getStatForDay(numberOfWeek: number) {
    return currentWeekStat.find((item) => item.dayOfTheWeek === numberOfWeek);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <Text size={24} lineHeight={33} weight={EWeight.bold}>Ваша активность</Text>
        <WeeksSelect
          currentMenu={currentMenu}
          onClick={handleSelectClick}
        />
      </div>

      <div className={styles.chartWrapper}>
        <LeftDashboard
          statForDay={statForDay} dayOfWeekForDisplay={dayOfWeekForDisplay}
        />

        <Chart
          currentWeekStat={currentWeekStat}
          onClick={changeStatDay}
        />
      </div>

      <BottomDashboard statForDay={statForDay}/>
    </div>
  );
};

export default StatisticsPage;
