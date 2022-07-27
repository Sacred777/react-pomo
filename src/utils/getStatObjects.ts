import {getDateStringYYYYMMDD} from "./timeutiltties";

// Получение шаблона объекта данных статистики без отдельных значений даты
export default function getShortStatDataTemplate (date: Date) {
  return {
    date: getDateStringYYYYMMDD(date),
    timerTime: 0,
    pomodoroTime: 0,
    pauseTime: 0,
    stopCount: 0,
    pomodoroCount: 0,
    taskCount: 0,
    lastLongBreakPomodoroCount: 0,
  }
}

