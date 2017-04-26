import getTypes from 'helpers/app/generateItemTypes'
import { splitter } from 'config'

const rulesTypeData = [
  {
    ru: 'Можно курить'
  },
  {
    ru: 'Можно с питомцами'
  },
  {
    ru: 'Подходит для мероприятий'
  }
];

export const rulesType = 'RULES_TYPE';
export const rulesTypes = {
  id: rulesType,
  name: 'Правила дома',
  types: getTypes(rulesType, rulesTypeData, splitter)
};
