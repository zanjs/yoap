import getTypes from 'helpers/app/generateItemTypes'
import { splitter } from 'config'

const furnitureTypeData = [
  {
    "ru":"Без мебели"
  },
  {
    "ru":"Полностью"
  },
  {
    "ru":"Частично"
  },
  {
    "ru":"Только кухня"
  }
];
export const furnitureType = 'FURNITURE_TYPE';
export const furnitureTypes = {
  id: furnitureType,
  name: 'Мебель',
  types: getTypes(furnitureType, furnitureTypeData, splitter)
};
