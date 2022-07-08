import {getDateStringYYYYMMDD, getNumberOfWeekSince01011970, getRusDayOfWeek} from "../utils/timeutiltties";

export function CreateStatState() {

  // Можно задать конец недели today = new Date('2022-06-10')
  const today = new Date();
  const currentWeekOfNumber = getNumberOfWeekSince01011970(today);
  const dateSince01011970 = new Date(currentWeekOfNumber * 7 * 24 * 60 * 60 * 1000);

  const countOfDaysBetore = 14;
  const startOfWeekMS = dateSince01011970.setDate(dateSince01011970.getDate() + getRusDayOfWeek(today) - 1 - countOfDaysBetore);
  let startOfWeek = new Date(startOfWeekMS);
  // console.log(startOfWeek);
  // console.log(getStatObj(startOfWeek));

  const statArray = []
  while (getDateStringYYYYMMDD(startOfWeek) < getDateStringYYYYMMDD(today)) {
    statArray.push(getStatObj(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() +1);
  }

  // console.log(statArray);

  // const statObj = {
  //   day: 1,
  //   month: 7,
  //   year: 2022,
  //   dayOfTheWeek: 5,
  //   week: 2738,
  //   date: '20220701',
  //   timerTime: 260,
  //   pomodoroTime: 60,
  //   pauseTime: 20,
  //   stopCount: 2,
  //   pomodoroCount: 1,
  //   taskCount: 1,
  //   lastLongBreakPomodoroCount: 1,
  // }

  return statArray;
}

function getStatObj(date: Date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    dayOfTheWeek: getRusDayOfWeek(date),
    week: getNumberOfWeekSince01011970(date),
    date: getDateStringYYYYMMDD(date),
    timerTime: getRandomInterval(2000, 18000),
    pomodoroTime: getRandomInterval(10, 1500),
    pauseTime: getRandomInterval(0, 15),
    stopCount: getRandomInterval(0, 10),
    pomodoroCount: getRandomInterval(0, 15),
    taskCount: getRandomInterval(0, 15),
    lastLongBreakPomodoroCount: 0,
  };
}

function getRandomInterval(x = 0, y = 0) {
  const min = Math.min(x,y);
  const max = Math.max(x,y);

  return Math.floor(min + Math.random() * (max - min));
}
