// Получает количество секунд на выходе строка количество лет, месяцев, дней, часов, минут, секунд
export function secondsToString(payload: number) {
  if (!payload) return '';

  const seconds = Math.floor(payload % 60);
  const minutes = Math.floor(payload / 60 % 60);
  const hours = Math.floor(payload / 3600 % 24);
  const days = Math.floor(payload / (3600 * 24) % 30.42);
  const month = Math.floor(payload / (3600 * 24 * 30.42) % 12);
  const years = Math.floor(payload / 31536000);

  let str = ''
  if (years) str += `${years} г. `;
  if (month) str += `${month} mec. `;
  if (days) str += `${days} д. `;
  if (hours) str += `${hours} ч. `;
  if (minutes) str += `${minutes} мин. `;
  if (seconds) str += `${seconds} c. `;

  return str.trim();
};
