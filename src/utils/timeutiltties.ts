// Получает количество секунд на выходе строка количество лет, месяцев, дней, часов, минут, секунд
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
};

// Получает дату в виде объекта Date
// Возвращает строку вида YYYYMMDD
export function getDateStringYYYYMMDD(payload: Date): string {
  const yearString = payload.getFullYear().toString();
  const month = payload.getMonth () + 1;
  const monthString = month < 10 ? '0' + month.toString() : month.toString();
  const dayString =  payload.getDate() < 10 ? '0' + payload.getDate().toString() : payload.getDate().toString();
  return yearString + monthString + dayString;
};

// Получает дату в виде объекта
// Возвращает номер недели с начала года
export function getNumberOfWeek(payload: Date): number {
  const oneJan = new Date(payload.getFullYear(),0,1);
  const numberOfDays = Math.floor((+payload - +oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil(( payload.getDay() + 1 + numberOfDays) / 7);
}


function getSeconds(payload: number) {
  return Math.floor(payload % 60);
}

function getMinutes(payload: number) {
  return Math.floor(payload / 60 % 60);
}
