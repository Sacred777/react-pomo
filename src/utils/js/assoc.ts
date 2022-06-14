// Добавляет в объект какие-то значения
// параметры:
// key - название поля
// value - значение

// export function assoc<K extends string, T>(key: K, value: T) {
//   return <O extends object>(obj: O) => ({
//     ...obj,
//     [key]: value,
//   }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>)
// }

export function assoc<K extends string, T>(key: K, value: T) {
  return <O extends object>(obj: O) => ({
    ...obj,
    [key]: value,
  }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>)
}
