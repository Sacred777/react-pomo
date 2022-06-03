import React from 'react';
// import classNames from "classnames";
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './settingsmodal.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";


export function SettingsModal() {
  const settings = useAppSelector(state => state.settings);
  // const dispatch = useAppDispatch();

  type TInputs = {
    taskTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    longBreakCycle: number;
    theme: boolean;
    massage: boolean;
  }

  const {
    register,
    formState: {
      isDirty,
      errors,
    },
    handleSubmit,
  } = useForm<TInputs>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    alert(JSON.stringify(data));
  }

  // TODO Если проверка на изменение данных. Вопрос как быть с оверлеем и кнопкой закрытия окна
  const handleClick = () => {
    console.log(isDirty);
  }

  return (
    <div>
      <h2>Настройки программы</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>

        {/* taskTime */}
        <label className={styles.label}>
          <span>Помидор, мин</span>
          <input
            className={styles.inputs}
            type='text'
            defaultValue={settings.taskTime / 60}
            {...register('taskTime',
              {
                required: 'Поле не может быть пустым',
                min: {
                  value: 1,
                  message: 'Значение должно быть больше 0',
                },
                max: {
                  value: 1440,
                  message: 'Значение не может быть больше 1440',
                },
                pattern: {
                  value: /^([1-9][0-9]*)$/,
                  message: 'Только цифры. Начальный 0 не допустим',
                },
              },
            )}
          />
        </label>
        <div className={styles.errorBox}>
          {errors.taskTime &&
            <p className={styles.error}>
              {errors.taskTime.message || 'Недопустимое значение'}
            </p>
          }
        </div>

        {/* shortBreakTime */}
        <label className={styles.label}>
          <span>Короткий перерыв, мин</span>
          <input
            className={styles.inputs}
            type='text'
            defaultValue={settings.shortBreakTime / 60}
            {...register('shortBreakTime',
              {
                required: 'Поле не может быть пустым',
                min: {
                  value: 1,
                  message: 'Значение должно быть больше 0',
                },
                max: {
                  value: 30,
                  message: 'Значение не может быть больше 30',
                },
                pattern: {
                  value: /^([1-9][0-9]*)$/,
                  message: 'Только цифры. Начальный 0 не допустим',
                },
              },
            )}
          />
        </label>
        <div className={styles.errorBox}>
          {errors.shortBreakTime &&
            <p className={styles.error}>
              {errors.shortBreakTime.message || 'Недопустимое значение'}
            </p>
          }
        </div>

        {/* longBreakTime */}
        <label className={styles.label}>
          <span>Длинный перерыв, мин</span>
          <input
            className={styles.inputs}
            type='text'
            defaultValue={settings.longBreakTime / 60}
            {...register('longBreakTime',
              {
                required: 'Поле не может быть пустым',
                min: {
                  value: 1,
                  message: 'Значение должно быть больше 0',
                },
                max: {
                  value: 180,
                  message: 'Значение не может быть больше 180',
                },
                pattern: {
                  value: /^([1-9][0-9]*)$/,
                  message: 'Только цифры. Начальный 0 не допустим',
                },
              },
            )}
          />
        </label>
        <div className={styles.errorBox}>
          {errors.longBreakTime &&
            <p className={styles.error}>
              {errors.longBreakTime.message || 'Недопустимое значение'}
            </p>
          }
        </div>

        {/* longBreakCycle */}
        <label className={styles.label}>
          <span>Помидоров до длинного перерыва</span>
          <input
            className={styles.inputs}
            type='text'
            defaultValue={settings.longBreakCycle / 60}
            {...register('longBreakCycle',
              {
                required: 'Поле не может быть пустым',
                min: {
                  value: 1,
                  message: 'Значение должно быть больше 0',
                },
                max: {
                  value: 30,
                  message: 'Значение не может быть больше 30',
                },
                pattern: {
                  value: /^([1-9][0-9]*)$/,
                  message: 'Только цифры. Начальный 0 не допустим',
                },
              },
            )}
          />
        </label>
        <div className={styles.errorBox}>
          {errors.longBreakCycle &&
            <p className={styles.error}>
              {errors.longBreakCycle.message || 'Недопустимое значение'}
            </p>
          }
        </div>


        <label className={styles.label}>
          <span>Включить тёмную тему</span>
          <input
            className={styles.inputs}
            type='checkbox'
            defaultChecked={settings.theme}
            {...register('massage')}
          />
        </label>
        <label className={styles.label}>
          <span>Отключить уведомления</span>
          <input
            className={styles.inputs}
            type='checkbox'
            defaultChecked={settings.massage}
          />
        </label>
        <div className={styles.buttonsWrapper}>
          <button type="submit" className={styles.applyButton}>Сохранить</button>
        </div>
      </form>
      <button onClick={handleClick}>Выйти</button>
    </div>
  );
}
