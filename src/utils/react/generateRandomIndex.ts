// generateId генерирует случайное число и добавляет в объект
//
// Применение
// const LIST = [
//   {value: 'some'},
//   {value: 'other some'},
//   {value: 'some'},
// ].map(generateId);

import {assoc} from "../js/assoc";

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export const assignId = assoc('id', generateRandomString);

export const generateId = <O extends object>(obj: O) => assignId(obj);
