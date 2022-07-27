// Получает количество секунд, на выходе - строка количество лет, месяцев, дней, часов, минут, секунд

export function secondsToString(payload: number) {
  if (!payload) return '';

  const seconds = getSeconds(payload);
  const minutes = getMinutes(payload);
  const hours = Math.floor(payload / 3600 % 24);
  const days = Math.floor(payload / (3600 * 24) % 30.42);
  const month = Math.floor(payload / (3600 * 24 * 30.42) % 12);
  const years = Math.floor(payload / 31536000);

  let str = '';
  if (years) str += `${years} г. `;
  if (month) str += `${month} mec. `;
  if (days) str += `${days} д. `;
  if (hours) str += `${hours} ч. `;
  if (minutes) str += `${minutes} мин. `;
  if (seconds) str += `${seconds} c. `;

  return str.trim();
};

//===========
// Получает количество секунд
// Возвращает строку вида MM:CC
export function showTime(payload: number) {
  const seconds = getSeconds(payload);
  const minutes = getMinutes(payload);
  let str = '';
  str += (minutes < 10) ? `0${minutes}` : `${minutes}`
  str += ':'
  str += (seconds < 10) ? `0${seconds}` : `${seconds}`

  return str;
}

//===========
// Получает дату в виде объекта Date
// Возвращает строку вида YYYYMMDD
export function getDateStringYYYYMMDD(payload: Date): string {
  const yearString = payload.getFullYear().toString();
  const month = payload.getMonth() + 1;
  const monthString = month < 10 ? '0' + month.toString() : month.toString();
  const dayString = payload.getDate() < 10 ? '0' + payload.getDate().toString() : payload.getDate().toString();
  return yearString + monthString + dayString;
};

//===========
// Получает дату в виде объекта
// Возвращает номер недели с начала года
export function getNumberOfWeek(payload: Date): number {
  const oneJan = new Date(payload.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((+payload - +oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((payload.getDay() + 1 + numberOfDays) / 7);
}

//===========
// Получает дату в виде объекта
// Возвращает номер недели текущей даты с 01.01.1970
// учитывается начало недели с пн по вс.
export function getNumberOfWeekSince01011970(date: Date): number {
  const dayOfWeek = getRusDayOfWeek(date);
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - dayOfWeek + 1);
  return Math.floor(dateCopy.getTime() / (7 * 24 * 60 * 60 * 1000));
}

function getSeconds(payload: number) {
  return Math.floor(payload % 60);
}

function getMinutes(payload: number) {
  return Math.floor(payload / 60 % 60);
}

//===========
// Получает дату в виде объекта
// Возвращает день недели в интервале пн-1, вс-7
export function getRusDayOfWeek(date: Date): number {
  return date.getDay() === 0 ? 7 : date.getDay();
}

//===========
// Возварщает полное имя дня недели
export function getFullNameOfDayOfWeek(dayOfWeek: number): string {
  return ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'][dayOfWeek];
}

//===========
// Получает количество секунд
// Возвращает строку в виде N часов NN минут
export function getStringOfSecondsHHMM(payload: number) {
  if (!payload) return '';

  const seconds = getSeconds(payload);
  const minutes = getMinutes(payload);
  const hours = Math.floor(payload / 3600 % 24);

  let string = hours ? hours.toString() + ' часов' : '';
  if (minutes) {
    if (string) {
      string = string + ' ';
    }
    string = minutes === 1 ? string + minutes.toString() + ' минуты' : string + minutes.toString() + ' минут';
  }
  if (seconds) {
    if (string) {
      string = string + ' ';
    }
    string = seconds === 1 ? string + seconds.toString() + ' секунды' : string + seconds.toString() + ' секунд'
  }

  return string;
}

//===========
// Получает количество секунд
// Возвращает строку в виде NS где N - кол-во единиц S - один знак (ч,м,с)
export function getStringOfSecondsNS(payload: number) {
  if (!payload) return '0c';

  const seconds = getSeconds(payload);
  const minutes = getMinutes(payload);
  const hours = Math.floor(payload / 3600 % 24);

  if (hours) {
    return hours.toString() + 'ч';
  } else if (minutes) {
    return minutes.toString() + 'м'
  } else {
    return seconds.toString() + 'с'
  }
}
