// TODO: Complete categoriesTypes
// TODO: добавить состояние квартир
import { divider, splitter } from 'config'
import { generateItemTypes as getTypes, getOrderId } from 'helpers'
import {
  amenitiesTypes, stateTypes,
  furnitureTypes,

  facilityTypesMedia, facilityTypesCommon,
  facilityTypesAppliances, facilityTypesSafety,
  facilityTypesStuff, facilityTypesAdditional
} from 'constants/itemConstants'

//import

export const categoryType = 'CATEGORY_TYPE';
const getId = getOrderId(`${categoryType}${splitter}`);

// ======================================== CATEGORY TYPES @ MINIMUM
export const categoryTypeMin = getId();
export const categoryTypesMin = {
  id: categoryTypeMin,
  name: 'Минимум',
  types: {
    required: [
      // Общие параметры
      facilityTypesCommon.types[0],
      facilityTypesCommon.types[1],
      facilityTypesCommon.types[2]
    ],
    additional: [
      // Мебель
      furnitureTypes.types[0],
      furnitureTypes.types[2],
      furnitureTypes.types[3],

      // Общие параметры
      facilityTypesCommon.types[3],
      facilityTypesCommon.types[4],
      facilityTypesCommon.types[5],
    ]
  }
};

// ======================================== CATEGORY TYPES @ BASE
export const categoryTypeBase = getId();
export const categoryTypesBase = {
  id: categoryTypeBase,
  name: 'Базовый',
  types: {
    required: [
      // Бытовая техника
      facilityTypesAppliances.types[0],
      facilityTypesAppliances.types[1],
      facilityTypesAppliances.types[4],

      // Общие параметры
      facilityTypesCommon.types[0],
      facilityTypesCommon.types[1],
      facilityTypesCommon.types[2],
    ],
    additional: [
      // Медиа
      facilityTypesMedia.types[0],
      facilityTypesMedia.types[1],
      facilityTypesMedia.types[5],
      facilityTypesMedia.types[6],

      // Бытовая техника
      facilityTypesAppliances.types[8],

      // Мебель
      furnitureTypes.types[1],
      furnitureTypes.types[2],

      // Общие параметры
      facilityTypesCommon.types[3],
      facilityTypesCommon.types[4],
      facilityTypesCommon.types[5],

      // Безопасность
      facilityTypesSafety.types[1],
      facilityTypesSafety.types[3],

      // Дополнительно
      facilityTypesAdditional.types[3],
      facilityTypesAdditional.types[4]
    ]
  }
};


// ======================================== CATEGORY TYPES @ COMFORT
export const categoryTypeComfort = getId();
export const categoryTypesComfort = {
  id: categoryTypeComfort,
  name: 'Комфорт',
  types: {
    required: [
      // Медиа
      facilityTypesMedia.types[0],
      facilityTypesMedia.types[1],
      facilityTypesMedia.types[2],

      // Бытовая техника
      facilityTypesAppliances.types[0],
      facilityTypesAppliances.types[1],
      facilityTypesAppliances.types[2],
      facilityTypesAppliances.types[4],
      facilityTypesAppliances.types[6],
      facilityTypesAppliances.types[7],
      facilityTypesAppliances.types[8],

      // Мебель
      furnitureTypes.types[1],

      // Общие параметры
      facilityTypesCommon.types[0],
      facilityTypesCommon.types[1],
      facilityTypesCommon.types[2],
      facilityTypesCommon.types[3],
    ],
    additional: [
      // Медиа
      facilityTypesMedia.types[5],
      facilityTypesMedia.types[6],

      // Бытовая техника
      facilityTypesAppliances.types[3],
      facilityTypesAppliances.types[5],

      // Общие параметры
      facilityTypesCommon.types[3],
      facilityTypesCommon.types[4],
      facilityTypesCommon.types[5],

      // Безопасность
      facilityTypesSafety.types[1],
      facilityTypesSafety.types[3],
      facilityTypesSafety.types[4],

      // Персонал
      facilityTypesStuff.types[0],

      // Дополнительно
      facilityTypesAdditional.types[3],
      facilityTypesAdditional.types[4],
      facilityTypesAdditional.types[5],

      // Помещения
      amenitiesTypes.types[0],
      amenitiesTypes.types[1],
      amenitiesTypes.types[8],
      amenitiesTypes.types[9]
    ]
  }
};


// ======================================== CATEGORY TYPES @ EXTENDED
export const categoryTypeExtended = getId();
export const categoryTypesExtended = {
  id: categoryTypeExtended,
  name: 'Расширенный',
  types: {
    required: [
      // Медиа
      facilityTypesMedia.types[0],
      facilityTypesMedia.types[1],
      facilityTypesMedia.types[2],

      // Бытовая техника
      facilityTypesAppliances.types[0],
      facilityTypesAppliances.types[1],
      facilityTypesAppliances.types[2],
      facilityTypesAppliances.types[3],
      facilityTypesAppliances.types[4],
      facilityTypesAppliances.types[6],
      facilityTypesAppliances.types[7],
      facilityTypesAppliances.types[8],

      // Мебель
      furnitureTypes.types[1],

      // Общие параметры
      facilityTypesCommon.types[0],
      facilityTypesCommon.types[1],
      facilityTypesCommon.types[2],

      // Помещения
      amenitiesTypes.types[10],
    ],
    additional: [
      // Медиа
      facilityTypesMedia.types[3],
      facilityTypesMedia.types[4],
      facilityTypesMedia.types[5],
      facilityTypesMedia.types[6],

      // Бытовая техника
      facilityTypesAppliances.types[5],

      // Общие параметры
      facilityTypesCommon.types[3],
      facilityTypesCommon.types[4],
      facilityTypesCommon.types[5],

      // Безопасность
      facilityTypesSafety.types[0],
      facilityTypesSafety.types[1],
      facilityTypesSafety.types[3],
      facilityTypesSafety.types[4],
      facilityTypesSafety.types[5],

      // Персонал
      facilityTypesStuff.types[0],
      facilityTypesStuff.types[1],

      // Дополнительно
      facilityTypesAdditional.types[3],
      facilityTypesAdditional.types[4],
      facilityTypesAdditional.types[5],

      // Помещения
      amenitiesTypes.types[0],
      amenitiesTypes.types[1],
      amenitiesTypes.types[3],
      amenitiesTypes.types[4],
      amenitiesTypes.types[5],
      amenitiesTypes.types[8],
      amenitiesTypes.types[9],
    ]
  }
};

// ======================================== CATEGORY TYPES @ LUX
export const categoryTypeLux = getId();
export const categoryTypesLux = {
  id: categoryTypeLux,
  name: 'Люкс',
  types: []
};

// ======================================== CATEGORY TYPES @ ENTRY POINT
export const categoryTypes = [
  categoryTypesMin, categoryTypesBase,
  categoryTypesComfort, categoryTypesExtended,

  categoryTypesLux
];
