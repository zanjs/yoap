import { generateItemTypes as getTypes } from 'helpers'
import { splitter } from 'config'

const stateTypeData = [
  {
    "ru":"Под отделку (голые стены)"
  },
  {
    "ru":"Без ремонта (ремонт старше 5-ти)"
  },
  {
    "ru":"Косметический ремонт"
  },
  {
    "ru":"Недавний (не старше 5-ти лет)"
  },
  {
    "ru":"Капитальный (не старше 2-ух лет)"
  },
  {
    "ru":"Уникальный дизайн (не старше 2-ух лет)"
  },
];
export const stateType = 'STATE_TYPE';
export const stateTypes = {
  id: stateType,
  name: 'Состояние',
  types: getTypes(stateType, stateTypeData, splitter)
};
