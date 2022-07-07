import {createStat} from "../store/statSlice";
import {useAppDispatch} from "../hooks/reduxHooks";

export function CreateStatState() {
  const dispatch = useAppDispatch();
  const statObj = {
    day: 6,
    month: 7,
    year: 2022,
    dayOfTheWeek: 3,
    week: 28,
    date: '20220706',
    timerTime: 260,
    pomodoroTime: 60,
    pauseTime: 20,
    stopCount: 2,
    pomodoroCount: 1,
    taskCount: 1,
    lastLongBreakPomodoroCount: 1,
  }

  dispatch(createStat(statObj))
}

