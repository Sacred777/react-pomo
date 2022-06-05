import React from 'react';
// import classNames from "classnames";
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';

import { EColors, EWeight, Text } from '../Text';
import styles from './settingsmodal.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Break } from '../Break';
import { changeSettings } from '../../store/settingsSlice';


export function SettingsModal() {
  // const settingsState = useAppSelector(state => state.settings);
  const settings = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();


  const gaps = 5;
  const labelSize = 24;
  const errorTextSize = 12;

  type TInputs = {
    taskTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    longBreakCycle: number;
    massage: boolean;
  }

  // const settings:TInputs = {
  //   taskTime: 0,
  //   shortBreakTime: 0,
  //   longBreakTime: 0,
  //   longBreakCycle: 0,
  //   massage: false,
  // };


  const {
    register,
    formState: {
      isDirty,
      errors,
      isValid,
      isSubmitSuccessful,
    },
    reset,
    handleSubmit,
  } = useForm<TInputs>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const settings = {
      taskTime: data.taskTime * 60,
      shortBreakTime: data.shortBreakTime * 60,
      longBreakTime: data.longBreakTime * 60,
      longBreakCycle: +data.longBreakCycle,
      massage: data.massage,
    }
    // alert(JSON.stringify(data));
    console.log(data);
    console.log(settings);
    dispatch(changeSettings(settings));
  }

  // React.useEffect(() => {
  //     settings.taskTime: settingsState.taskTime,

  //   }
  //  }, [settingsState])


  // TODO Если проверка на изменение данных. Вопрос как быть с оверлеем и кнопкой закрытия окна
  const handleClick = () => {
    console.log(isDirty);
  }

  return (
    <div>
      <Text As={'h2'} size={24} lineHeight={24} weight={EWeight.medium}>Настройки программы</Text>
      <Break size={12} top />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>

        {/* taskTime */}
        <label className={styles.label}>
          <Text size={labelSize} lineHeight={labelSize} color={EColors.grey33}>Помидор, мин</Text>
          <Break size={gaps} top />
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
            <Text As={'p'} size={errorTextSize} lineHeight={1} color={EColors.red}>
              {errors.taskTime.message || 'Недопустимое значение'}
            </Text>
          }
        </div>

        {/* shortBreakTime */}
        <label className={styles.label}>
          <Text size={labelSize} lineHeight={labelSize} color={EColors.grey33}>Короткий перерыв, мин</Text>
          <Break size={gaps} top />
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
            <Text As={'p'} size={errorTextSize} lineHeight={1} color={EColors.red}>
              {errors.shortBreakTime.message || 'Недопустимое значение'}
            </Text>
          }
        </div>

        {/* longBreakTime */}
        <label className={styles.label}>
          <Text size={labelSize} lineHeight={labelSize} color={EColors.grey33}>Длинный перерыв, мин</Text>
          <Break size={gaps} top />
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
            <Text As={'p'} size={errorTextSize} lineHeight={1} color={EColors.red}>
              {errors.longBreakTime.message || 'Недопустимое значение'}
            </Text>
          }
        </div>

        {/* longBreakCycle */}
        <label className={styles.label}>
          <Text size={labelSize} lineHeight={labelSize} color={EColors.grey33}>Помидоров до длинного перерыва</Text>
          <Break size={gaps} top />
          <input
            className={styles.inputs}
            type='text'
            defaultValue={settings.longBreakCycle}
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
            <Text As={'p'} size={errorTextSize} lineHeight={1} color={EColors.red}>
              {errors.longBreakCycle.message || 'Недопустимое значение'}
            </Text>
          }
        </div>

        <label className={styles.label}>
          <Text size={labelSize} lineHeight={labelSize} color={EColors.grey33}>Отключить уведомления</Text>
          <Break size={gaps} top />
          <input
            className={styles.inputs}
            type='checkbox'
            defaultChecked={settings.massage}
            {...register('massage')}
          />
          <Break size={12} top />
        </label>

        <div className={styles.buttonsWrapper}>
          <button type="submit" className={styles.applyButton} disabled={!isValid || !isDirty}>
            <Text size={16} lineHeight={17} color={EColors.white}>Сохранить</Text>
          </button>
        </div>
      </form>

      <Break size={gaps} top />

      <button className={styles.cancelButton} onClick={handleClick}>
        <Text size={16} lineHeight={17} color={EColors.red}>Выйти</Text>
      </button>
    </div>
  );
}
