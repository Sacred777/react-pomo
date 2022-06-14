// Вызов функции onChange={preventDefault(getValue(onChange)))
// получит значение из syntheticEvent,
// выполнит preventDefault
// передаст значение в функцию обработчик событий

import React from "react";

export function preventDefault<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent<any>>(e: E) => {
    e.preventDefault();
    fn(e);
  };
}
