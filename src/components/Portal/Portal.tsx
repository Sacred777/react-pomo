import React, {ReactNode, useEffect, useMemo} from 'react';
// import styles from './portal.css';
import {createPortal} from "react-dom";

interface IPortal {
  children: ReactNode;
  root?: Element;
  className?: string;
}

export function Portal({ children, root, className}: IPortal ) {
  const el = useMemo(() => document.createElement('div'),[]);

  useEffect(() => {
    const target = root && root.appendChild ? root : document.body;
    const classList = ['portal'];

    // TODO для складывания классов использовать утилиту
    if (className) {
      className.split(' ').forEach(cn => classList.push(cn));
    }
    classList.forEach(cn => el.classList.add(cn));

    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [className, el, el.classList, root]);

  return createPortal(children, el);
}
