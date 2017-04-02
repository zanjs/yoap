import getTypes from 'helpers/app/generateItemTypes'
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
  },
  {
    ru: 'Удалено'
  }
];

export const statusType = 'STATUS_TYPE';
export const statusTypes = {
  id: statusType,
  name: 'Статус объявления',
  types: getTypes(statusType, statusesTypeData, splitter)
};
