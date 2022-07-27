// Добавляет компоненте уникальный ключ либо уникальный,
// либо индекс массива - это нежелательно
// Применение
// function Feed(props: { blocks: IBlockProps[] }) {
//   return (
//     <div>
//       {props.blocks.map(withIdKey(Block))}
//     </div>
//   );
// }

import React from "react";

export const withIdKey = withKey('id');

export function withKey(key?: string) {
  return <E extends Record<string, unknown>, T extends React.ComponentType<E>>(component: T) =>
    (props: E, index: number) =>
      React.createElement(
        component,
        {...props, key: key ? props[key as keyof E] : index},
        [],
      );
}
