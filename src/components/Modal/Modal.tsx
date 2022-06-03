import React, { ReactNode } from 'react';
import styles from './modal.module.css';
import { EIcons, Icon } from "../Icon";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setIsActive } from '../../store/modalSlice';
import classNames from 'classnames';

interface IModalProps {
  children?: ReactNode;
}

export function Modal({ children }: IModalProps) {
  const isModalActive = useAppSelector(state => state.modal.isActive);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setIsActive(false));
  }

  // TODO удачный ли вариант stopPropagation
  return (
    <div className={isModalActive ? classNames(styles.overlay, styles.isActive) : styles.overlay}
      onClick={closeModal}>
      <div className={isModalActive ? classNames(styles.modal, styles.isOpen) : styles.modal} id='modal' onClick={(e) => { e.stopPropagation() }}>
        <button className={styles.closeBtn} onClick={closeModal}>
          <Icon name={EIcons.close} size={40} title={'Закрыть окно'} role={'img'} />
        </button>
        {children}
      </div>
    </div>
  );
}
