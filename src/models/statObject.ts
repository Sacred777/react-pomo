export type TStat = {
  day: number;
  month: number;
  year: number;
  dayOfTheWeek: number;
  week: number;
  date: string;
  timerTime: number;
  pomodoroTime: number;
  pauseTime: number;
  stopCount: number;
  pomodoroCount: number;
  taskCount: number;
  lastLongBreakPomodoroCount: number;
}

export const statObject: TStat = {
  day: 0,
  month: 0,
  year: 0,
  dayOfTheWeek: 0,
  week: 0,
  date: '',
  timerTime: 0,
  pomodoroTime: 0,
  pauseTime: 0,
  stopCount: 0,
  pomodoroCount: 0,
  taskCount: 0,
  lastLongBreakPomodoroCount: 0,
}
