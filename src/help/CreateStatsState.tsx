import {getDateStringYYYYMMDD, getNumberOfWeekSince01011970, getRusDayOfWeek} from "../utils/timeutiltties";

// TODO вспомогательная функция для создания массива статистики за заданное кол-во дней.
export function CreateStatState() {
  const COUNTS_OF_DAY_BEFORE = 14;
  const today = new Date();
  const currentWeekOfNumber = getNumberOfWeekSince01011970(today);
  const dateSince01011970 = new Date(currentWeekOfNumber * 7 * 24 * 60 * 60 * 1000);
  const startOfWeekMS = dateSince01011970.setDate(dateSince01011970.getDate() + getRusDayOfWeek(today) - 1 - COUNTS_OF_DAY_BEFORE);
  let startOfWeek = new Date(startOfWeekMS);

  const statArray = []
  while (getDateStringYYYYMMDD(startOfWeek) < getDateStringYYYYMMDD(today)) {
    statArray.push(getStatObj(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

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
  const min = Math.min(x, y);
  const max = Math.max(x, y);

  return Math.floor(min + Math.random() * (max - min));
}
