import isEmpty from './isEmpty'
import declination from './declination'

const declDays = declination([
  'день',
  'дня',
  'дней'
])
const declWeeks = declination([
  'неделя',
  'недели',
  'недель'
])
const declHours = declination([
  'час',
  'часа',
  'часов'
])

export default __data => {
  if (isEmpty(__data))
    return 'Свежее';

  const current = new Date();
  let currentYear = current.getFullYear().toString();
  let currentMonth = (current.getMonth()+1).toString();
  const date = new Date(__data);
  let day = date.getDate().toString();
  let month = (date.getMonth()+1).toString();
  let year = date.getFullYear().toString();

  if (year === currentYear && month === currentMonth) {
    const currentDay = parseInt(current.getDate().toString(), 10);
    const objectDay = parseInt(day, 10);
    const currentHour = current.getHours();
    const objectHour = date.getHours();
    const dayDifference = currentDay - objectDay;

    console.log({
      objectHour, objectDay, currentDay, currentHour,
      dayDifference
    });

    if (objectDay === currentDay) {
      if ((currentHour - objectHour) <= 12) {
        return `${objectHour} ${declHours(objectHour)} назад`
      }

      return 'Сегодня'
    }
    if (dayDifference === 1) {
      return 'Вчера'
    }
    if (dayDifference < 7) {
      return `${dayDifference} ${declDays(dayDifference)} назад`
    }
    if (dayDifference >= 7 && dayDifference <= 14) {
      const weeks = parseInt(dayDifference / 7);
      return `${weeks} ${declWeeks(weeks)} назад`
    }
  }

  if (day.length < 2) {
    day = `0${day}`
  }
  if (month.length < 2) {
    month = `0${month}`
  }

  return `${day}.${month}.${year}`
}