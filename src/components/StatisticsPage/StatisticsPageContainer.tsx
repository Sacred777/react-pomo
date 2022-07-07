import React from 'react';
import {IStatisticsPageProps, StatisticsPage} from "./StatisticsPage";

const StatisticsPageContainer = () => {

  const pr: IStatisticsPageProps = {
    dayOfWeek: 'Суббота',
    workingOnTaskTime: '120 минут',
    pomodoroCount: 2,
    focusPercents: '35%',
    pauseTime: '14м',
    stopCount: '3',
    moButtonHeight: '10%',
    tuButtonHeight: '20%',
    weButtonHeight: '40%',
    thButtonHeight: '55%',
    frButtonHeight: '37%',
    saButtonHeight: '9%',
    suButtonHeight: '1%',
    oneLineLevelValue: '25 мин',
    twoLineLevelValue: '50 мин',
    threeLineLevelValue: '75 мин',
    fourLineLevelValue: '100 мин',
  }

  return (
    <>
      <StatisticsPage {...pr}/>
    </>
  );
};

export default StatisticsPageContainer;
