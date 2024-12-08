export const getRandomTimestamp = (daysRange: number): string => {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * daysRange);
  const randomDate = new Date();
  randomDate.setDate(now.getDate() - randomDaysAgo);
  return randomDate.toISOString();
};

// export const generateTimestamp = (
//   baseDaysAgo: number,
//   randomDayRange: number
// ): string => {
//   const baseDate = new Date(); // Текущая дата
//   baseDate.setDate(baseDate.getDate() - baseDaysAgo); // Вычитаем базовые дни

//   const randomShift = Math.floor(Math.random() * randomDayRange);
//   baseDate.setDate(baseDate.getDate() - randomShift);

//   const randomHours = Math.floor(Math.random() * 24); // Случайные часы
//   const randomMinutes = Math.floor(Math.random() * 60); // Случайные минуты
//   const randomSeconds = Math.floor(Math.random() * 60); // Случайные секунды

//   baseDate.setHours(randomHours);
//   baseDate.setMinutes(randomMinutes);
//   baseDate.setSeconds(randomSeconds);

//   return baseDate.toISOString();
// };

export let lastGeneratedDate: Date | null = null;

export const setLastGeneratedDate = (date: Date) => {
  lastGeneratedDate = date;
};

// import { lastGeneratedDate, setLastGeneratedDate } from './timestampState';
export const generateTimestamp = (
  baseDaysAgo: number,
  randomDayRange: number
): string => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - baseDaysAgo);

  const maxDate = new Date(baseDate);
  maxDate.setDate(baseDate.getDate() + randomDayRange);

  let currentDate = lastGeneratedDate
    ? new Date(lastGeneratedDate)
    : new Date(baseDate);

  const randomShiftMs = Math.floor(Math.random() * 3600000);
  currentDate = new Date(currentDate.getTime() + randomShiftMs);

  if (currentDate > maxDate) {
    currentDate = maxDate;
  }

  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);
  currentDate.setMinutes(currentDate.getMinutes() + randomMinutes);
  currentDate.setSeconds(randomSeconds);

  setLastGeneratedDate(currentDate);

  return currentDate.toISOString();
};

export const generateTimestampUniform = (() => {
  let recordIndex = 0;
  let totalRecords = 1000;
  let baseDate: Date | null = null;
  let intervalSeconds: number | null = null;

  return (
    baseDaysAgo: number,
    randomDayRange: number,
    reset: boolean = false
  ): string => {
    if (reset || baseDate === null) {
      baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - baseDaysAgo);

      const maxDate = new Date(baseDate);
      maxDate.setDate(baseDate.getDate() + randomDayRange);

      const totalSecondsInRange =
        (maxDate.getTime() - baseDate.getTime()) / 1000;

      intervalSeconds = totalSecondsInRange / totalRecords;
      recordIndex = 0;
    }

    if (recordIndex >= totalRecords) {
      throw new Error('Все временные интервалы уже использованы!');
    }

    const recordStartSeconds = intervalSeconds! * recordIndex;

    const randomOffsetSeconds = Math.random() * intervalSeconds!;

    const totalRecordSeconds = recordStartSeconds + randomOffsetSeconds;

    const recordDate = new Date(
      baseDate!.getTime() + totalRecordSeconds * 1000
    );

    recordIndex++;

    return recordDate.toISOString();
  };
})();
