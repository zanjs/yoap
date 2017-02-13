import { generateItemTypes as getTypes } from 'helpers'
import { splitter } from 'config'

const objectTypeData = [
  {
    ru: 'Дом'
  },
  {
    ru: 'Квартира'
  },
  {
    ru: 'Студия'
  },
  {
    ru: 'Комната'
  },
];

export const objectType = 'OBJECT_TYPE';
export const objectTypes = {
  id: objectType,
  name: 'Тип объекта',
  types: getTypes(objectType, objectTypeData, splitter)
};
