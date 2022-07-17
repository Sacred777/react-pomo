import React, {ReactNode, useEffect, useRef, useState} from 'react';
import styles from './modal.module.css';
import {EIcons, Icon, TSizes} from "../Icon";
import {NOOP} from "../../utils/js/noop";
import classNames from 'classnames';

interface IModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeIconSize?: TSizes;
}

export function Modal({children, isOpen, onOpen = NOOP, onClose = NOOP, closeIconSize = 40}: IModalProps) {
  // const isModalActive = useAppSelector(state => state.modal.isActive);
  // const dispatch = useAppDispatch();
  const [isModalActive, setIsModalActive] = useState(isOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    setIsModalActive(isOpen);
  }, [isOpen])

  useEffect(() => {
    isModalActive ? onOpen() : onClose();
  }, [isModalActive])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if(event.target instanceof Node && !ref.current?.contains(event.target)) {
        // console.log('clicked out');
        setIsModalActive(false)
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  },[isModalActive])

  const closeModal = () => {
    setIsModalActive(false)
  }

  // TODO удачный ли вариант stopPropagation
  return (
    <div className={isModalActive ? classNames(styles.overlay, styles.isActive) : styles.overlay}
         onClick={closeModal}>
      <div
        className={isModalActive ? classNames(styles.modal, styles.isOpen) : styles.modal}
        id='modal'
        onClick={(e) => {
          e.stopPropagation()
        }}
        ref={ref}
      >
        <button className={styles.closeBtn} onClick={closeModal}>
          <Icon name={EIcons.close} size={closeIconSize} title={'Закрыть окно'} role={'img'}/>
        </button>
        {children}
      </div>
    </div>
  );
}
