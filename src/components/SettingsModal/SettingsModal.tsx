import React from 'react';
// import classNames from "classnames";
import {SubmitHandler, useForm} from 'react-hook-form';

import {EColors, EWeight, Text} from '../Text';
import styles from './settingsmodal.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {Break} from '../Break';
import {
  changeLongBreakCycle,
  changeLongBreakTime,
  changeShortBreakTime,
  changeTaskTime
} from '../../store/settingsSlice';
import ReactSlider from 'react-slider';


export function SettingsModal() {
  const settings = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const gaps = 5;
  const labelSize = 16;

  return (
    <div className={styles.wrapper}>
      <Text As={'h2'} size={24} lineHeight={24} weight={EWeight.medium}>Настройки программы</Text>
      <Break size={20} top/>

      <ul>
        <li className={styles.listItem}>
          <Text As={'label'} size={labelSize} lineHeight={1}>
            {`Помидор - ${settings.taskTime / 60}:00`}
          </Text>
          <ReactSlider
            className={styles.redSlider}
            thumbClassName={styles.redThumb}
            trackClassName={styles.track}
            value={settings.taskTime / 60}
            onChange={(newValue) => dispatch(changeTaskTime(newValue * 60))}
            min={1}
            max={60}
          />
        </li>
        <li className={styles.listItem}>
          <Text As={'label'} size={labelSize} lineHeight={1}>
            {`Короткий перерыв - ${settings.shortBreakTime / 60}:00`}
          </Text>
          <ReactSlider
            className={styles.greenSlider}
            thumbClassName={styles.greenThumb}
            trackClassName={styles.track}
            value={settings.shortBreakTime / 60}
            onChange={(newValue) => dispatch(changeShortBreakTime(newValue * 60))}
            min={1}
            max={30}
          />
        </li>

        <li className={styles.listItem}>
          <Text As={'label'} size={labelSize} lineHeight={1}>
            {`Длинный перерыв - ${settings.longBreakTime / 60}:00`}
          </Text>
          <ReactSlider
            className={styles.greenSlider}
            thumbClassName={styles.greenThumb}
            trackClassName={styles.track}
            value={settings.longBreakTime / 60}
            onChange={(newValue) => dispatch(changeLongBreakTime(newValue * 60))}
            min={1}
            max={60}
          />
        </li>

        <li className={styles.listItem}>
          <Text As={'label'} size={labelSize} lineHeight={1}>
            {`Помидоров до длинного перерыва - ${settings.longBreakCycle}`}
          </Text>
          <ReactSlider
            className={styles.greenSlider}
            thumbClassName={styles.greenThumb}
            trackClassName={styles.track}
            value={settings.longBreakCycle}
            onChange={(newValue) => dispatch(changeLongBreakCycle(newValue))}
            min={1}
            max={10}
          />
        </li>
      </ul>

    </div>
  );
}
