import { generateItemTypes as getTypes } from 'helpers'
import { splitter } from 'config'

const termTypeData = [
  {
    ru: 'Посуточно'
  },
  {
    ru: 'Длительно'
  }
];

export const termType = 'TERM_TYPE';
export const termTypes = {
  id: termType,
  name: 'Срок аренды',
  types: getTypes(termType, termTypeData, splitter)
};
