import React from 'react';
import {EWeight, Text} from '../../Text';
import styles from "./content.module.css";

export function Content() {
  return (
    <>
      <Text As={'h2'} size={24} weight={EWeight.bold} lineHeight={33}>Ура! Теперь можно начать работать:</Text>
      <ul>
        <Text As={'li'} size={16} lineHeight={33}>Выберите категорию и напишите название текущей задачи</Text>
        <Text As={'li'} size={16} lineHeight={33}>Запустите таймер («помидор»)</Text>
        <Text As={'li'} size={16} lineHeight={33}>Работайте пока «помидор» не прозвонит</Text>
        <Text As={'li'} size={16} lineHeight={33}>Сделайте короткий перерыв (3-5 минут)</Text>
        <Text As={'li'} size={16} lineHeight={33}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</Text>
      </ul>
    </>
  );
}
