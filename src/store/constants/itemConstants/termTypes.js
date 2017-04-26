import getTypes from 'helpers/app/generateItemTypes'
import { splitter } from 'config'

const termTypeData = [
  {
    ru: 'Сутки'
  },
  {
    ru: 'Неделя'
  },
  {
    ru: 'Месяц'
  },
  {
    ru: 'Полгода'
  },
  {
    ru: 'Год'
  }
];

export const termType = 'TERM_TYPE';
export const termTypes = {
  id: termType,
  name: 'Срок аренды',
  types: getTypes(termType, termTypeData, splitter)
};
