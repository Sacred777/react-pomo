// Вызов функции onChange={preventAll(getValue(onChange)))
// получит значение из syntheticEvent,
// выполнит preventDefault, stopPropagation
// передаст значение в функцию обработчик событий
// эквивалент onChange={preventDefault(stopPropagation(getValue(onChange))))

import React from "react";

export function preventAll<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent<any>>(e: E) => {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
  };
}
