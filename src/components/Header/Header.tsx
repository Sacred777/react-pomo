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
    <header >
      <nav>
        <ul className={styles.list}>
          <li>
            <Link className={styles.link} to="/">
              <Icon name={EIcons.logo} size={40} title={'Логотип помодоро бокс'} role={'img'} />
              <Break size={12} />
              <Text size={24} color={EColors.red} weight={EWeight.light} lineHeight={24}>pomodoro_box</Text>
            </Link>
          </li>
          <li>
            {/*<Link className={styles.link} to="/settings">*/}
            <button className={styles.link} onClick={() => { openModal() }}>
              <Icon name={EIcons.settings} size={20} />
              <Break size={5} />
              <Text size={16} color={EColors.red} lineHeight={17}>Настройки</Text>
            </button>
            {/*</Link>*/}
          </li>
          <li>
            <Link className={styles.link} to="/stat">
              <Icon name={EIcons.statistics} size={16} />
              <Break size={5} />
              <Text size={16} color={EColors.red} lineHeight={17}>Статистика</Text>
            </Link>
          </li>
        </ul>
      </nav>

      <Portal>
        <Modal>
          <SettingsModal />
        </Modal>
      </Portal>

    </header>
  );
}
