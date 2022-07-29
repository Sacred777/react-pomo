import React from 'react';
import styles from './timer.module.css';
import {EColors, EWeight, Text} from '../../Text';
import {Break} from '../../Break';
import {EIcons, Icon} from '../../Icon';
import {Button, EButtonColors} from '../../Button';

export enum EWindowTypes {
  initial = 'initial',
  starting = 'starting',
  pausing = 'pausing',
  breaking = 'breaking',
  breakPausing = 'breakPausing',
}

interface ITimer {
  windowType: EWindowTypes,
  taskName: string;
  pomodoroCount: number;
  timerDigits: string;
  handleAddTime: () => void;
  taskNumber: number;
  handleLeftButtonClick: () => void;
  handleRightButtonClick: () => void;
  isAddButtonDisabled?: boolean;
  isLeftButtonDisabled?: boolean;
  isRightButtonDisabled?: boolean;
}

export function Timer(
  {
    isLeftButtonDisabled = false,
    isRightButtonDisabled = false,
    isAddButtonDisabled = false,
    ...props
  }: ITimer) {

  let leftButtonName = '';
  let rightButtonName = '';
  let headerStyles;
  let timerStyles;

  switch (props.windowType) {
    case EWindowTypes.initial:
      leftButtonName = 'Старт';
      rightButtonName = 'Стоп';
      headerStyles = styles.header;
      timerStyles = EColors.grey33;
      break
    case EWindowTypes.starting:
      leftButtonName = 'Пауза';
      rightButtonName = 'Стоп';
      headerStyles = styles.header + ' ' + styles.headerRed;
      timerStyles = EColors.red;
      break
    case EWindowTypes.pausing:
      leftButtonName = 'Продолжить';
      rightButtonName = 'Сделано';
      headerStyles = styles.header + ' ' + styles.headerRed;
      timerStyles = EColors.grey33;
      break
    case EWindowTypes.breaking:
      leftButtonName = 'Пауза';
      rightButtonName = 'Пропустить';
      headerStyles = styles.header + ' ' + styles.headerGreen;
      timerStyles = EColors.green;
      break
    case EWindowTypes.breakPausing:
      leftButtonName = 'Продолжить';
      rightButtonName = 'Пропустить';
      headerStyles = styles.header + ' ' + styles.headerGreen;
      timerStyles = EColors.black;
      break
    default:
      leftButtonName = 'Старт';
      rightButtonName = 'Стоп';
      break
  }

  return (
    <>
      <div className={headerStyles}>
        <Text As={'p'} size={16} lineHeight={17} color={EColors.white} weight={EWeight.bold}>{props.taskName}</Text>

        <Text As={'p'} size={16} lineHeight={17} color={EColors.white}>
          {props.windowType === EWindowTypes.breaking || props.windowType === EWindowTypes.breakPausing ? 'Перерыв' :
            `Помидор ${props.pomodoroCount ? props.pomodoroCount : ''}`}
        </Text>
      </div>

      <div className={styles.body}>
        <div className={styles.timerBox}>
          <Text As="span" size={150} lineHeight={179} weight={EWeight.extraLight} color={timerStyles}>
            {props.timerDigits}</Text>
          <button
            className={styles.addBtnBox}
            disabled={isAddButtonDisabled}
            onClick={props.handleAddTime}
          >
            <Icon name={EIcons.add} size={50}></Icon>
          </button>
        </div>

        <p>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey99}>
            {`Задача ${props.taskNumber ? props.taskNumber : ''} - `}
          </Text>
          <Text As="span" size={16} lineHeight={17} color={EColors.grey33}>
            {props.taskName ? props.taskName : ''}
          </Text>
        </p>

        <Break size={35} top/>

        <div className={styles.btnsBox}>
          <Button
            type={'button'}
            disabled={isLeftButtonDisabled}
            onClick={props.handleLeftButtonClick}
          >
            <Text size={16} lineHeight={17} color={EColors.white} weight={EWeight.medium}>{leftButtonName}</Text>
          </Button>

          <Break size={25} inline/>

          <Button
            type={'button'}
            color={EButtonColors.red}
            disabled={isRightButtonDisabled}
            onClick={props.handleRightButtonClick}
          >
            <Text size={16} lineHeight={17} color={EColors.red} weight={EWeight.medium}>{rightButtonName}</Text>
          </Button>
        </div>
      </div>
    </>
  );
}
