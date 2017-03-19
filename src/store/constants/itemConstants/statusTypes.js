import { generateItemTypes as getTypes } from 'helpers'
import { splitter } from 'config'

const statusesTypeData = [
  {
    ru: 'Модерация'
  },
  {
    ru: 'Опубликовано'
  },
  {
    ru: 'Отказано'
  }
];

export const statusType = 'RULES_TYPE';
export const statusTypes = {
  id: statusType,
  name: 'Статус объявления',
  types: getTypes(statusType, statusesTypeData, splitter)
};
