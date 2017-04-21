import { generateItemTypes as getTypes } from 'helpers'
import { splitter } from 'config'

const amenityTypeData = [
  {
    ru: 'Лифт'
  },
  {
    ru: 'Парковка'
  },
  {
    ru: 'Детская площадка'
  },
  {
    ru: 'Балкон / Терраса / Мансарда'
  },
  {
    ru: 'Тренажерный зал'
  },
  {
    ru: 'Бассейн'
  },
  {
    ru: 'Джакузи'
  },
  {
    ru: 'Сауна'
  },
  {
    ru: 'Камин'
  },
  {
    ru: 'Бильярдная'
  },
  {
    ru: 'Гардеробная'
  }
];

export const amenityType = 'AMENITY_TYPE';
export const amenitiesTypes = {
  id: amenityType,
  name: 'Помещения',
  types: getTypes(amenityType, amenityTypeData, splitter)
};
