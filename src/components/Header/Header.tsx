import React from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.css';

import { EIcons, Icon } from "../Icon";
import { Break } from "../Break";
import { EColors, EWeight, Text } from '../Text';
import { Portal } from "../Portal";
import { Modal } from "../Modal";
import { SettingsModal } from "../SettingsModal";
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setIsActive } from '../../store/modalSlice'

export function Header() {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setIsActive(true));
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logoWrapper}>

            <Link className={styles.link} to="/">
              <Icon name={EIcons.logo} size={40} title={'Логотип помодоро бокс'} role={'img'} />
              <Break size={12} />
              <Text size={24} color={EColors.red} weight={EWeight.light} lineHeight={24}>pomodoro_box</Text>
            </Link>

            <label className={styles.themeLabel}>
              <input className={styles.themeInput} type="checkbox" name='theme' />
              <span className={styles.themeSpan}></span>
            </label>
          </div>

          <button className={styles.link} onClick={() => { openModal() }}>
            <Icon name={EIcons.settings} size={20} />
            <Break size={5} />
            <Text size={16} color={EColors.red} lineHeight={17}>Настройки</Text>
          </button>

          <Link className={styles.link} to="/stat">
            <Icon name={EIcons.statistics} size={16} />
            <Break size={5} />
            <Text size={16} color={EColors.red} lineHeight={17}>Статистика</Text>
          </Link>

        </nav>
      </div>

      <Portal>
        <Modal>
          <SettingsModal />
        </Modal>
      </Portal>

    </header>
  );
}
