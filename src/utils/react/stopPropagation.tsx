// Вызов функции onChange={stopPropagation(getValue(onChange)))
// получит значение из syntheticEvent,
// выполнит stopPropagation
// передаст значение в функцию обработчик событий

import React from "react";

export function stopPropagation<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent<any>>(e: E) => {
    e.stopPropagation();
    fn(e);
  };
}
