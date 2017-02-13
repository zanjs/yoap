import { splitter } from 'config'
import { generateItemTypes as getTypes, getOrderId } from 'helpers'


// ======================================== FACILITY TYPES
export const facilityType = 'FACILITY_TYPE';
const getId = getOrderId(`${facilityType}${splitter}`);

// ======================================== FACILITY TYPES @ MEDIA-COMMUNICATIONS
export const facilityTypeMedia = getId();
const facilityTypeMediaData = [
  {
    "ru":"Wifi"
  },
  {
    "ru":"Телевизор"
  },
  {
    "ru":"Кабельное телевидение"
  },
  {
    "ru":"Аудиосистема"
  },
  {
    "ru":"Компьютер"
  },
  {
    "ru":"Стационарный телефон"
  },
  {
    "ru":"Проводной интернет"
  }
];
export const facilityTypesMedia = {
  id: facilityTypeMedia,
  name: 'Медиа-коммуникации',
  types: getTypes(facilityTypeMedia, facilityTypeMediaData)
};

// ======================================== FACILITY TYPES @ COMMON COMMUNICATIONS
export const facilityTypeCommon = getId();
const facilityTypeCommonData = [
  {
    "ru":"Электричество"
  },
  {
    "ru":"Вода"
  },
  {
    "ru":"Отопление"
  },
  {
    "ru":"Газ"
  },
  {
    "ru":"Счетчики"
  },
  {
    "ru":"Кондиционер"
  }
];
export const facilityTypesCommon = {
  id: facilityTypeCommon,
  name: 'Общие коммуникации',
  types: getTypes(facilityTypeCommon, facilityTypeCommonData)
};

// ======================================== FACILITY TYPES @ APPLIANCES
export const facilityTypeAppliances = getId();
const facilityTypeAppliancesData = [
  {
    "ru":"Холодильник"
  },
  {
    "ru":"Кухонная плита"
  },
  {
    "ru":"Микроволновая печь"
  },
  {
    "ru":"Посудомоечная машина"
  },
  {
    "ru":"Стиральная машина"
  },
  {
    "ru":"Сушильная машина"
  },
  {
    "ru":"Утюг"
  },
  {
    "ru":"Фен"
  },
  {
    "ru":"Пылесос"
  }
];
export const facilityTypesAppliances = {
  id: facilityTypeAppliances,
  name: 'Бытовая техника',
  types: getTypes(facilityTypeAppliances, facilityTypeAppliancesData)
};

// ======================================== FACILITY TYPES @ FURNITURE
export const facilityTypeFurniture = getId();
const facilityTypeFurnitureData = [
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
export const facilityTypesFurniture = {
  id: facilityTypeFurniture,
  name: 'Мебель',
  types: getTypes(facilityTypeFurniture, facilityTypeFurnitureData)
};

// ======================================== FACILITY TYPES @ SAFETY
export const facilityTypeSafety = getId();
const facilityTypeSafetyData = [
  {
    "ru":"Охрана территории"
  },
  {
    "ru":"Домофон"
  },
  {
    "ru":"Видеонаблюдение"
  },
  {
    "ru": "Пожарная безопасность"
  },
  {
    "ru": "Сигнализация"
  },
  {
    "ru": "Сейф"
  }
];
export const facilityTypesSafety = {
  id: facilityTypeSafety,
  name: 'Безопасность',
  types: getTypes(facilityTypeSafety, facilityTypeSafetyData)
};

// ======================================== FACILITY TYPES @ STUFF
export const facilityTypeStuff = getId();
const facilityTypeStuffData = [
  {
    "ru":"Консьерж"
  },
  {
    "ru":"Горничная"
  },
  {
    "ru":"Повар"
  },
];
export const facilityTypesStuff = {
  id: facilityTypeStuff,
  name: 'Персонал',
  types: getTypes(facilityTypeStuff, facilityTypeStuffData)
};

// ======================================== FACILITY TYPES @ STATE
export const facilityTypeState = getId();
const facilityTypeStateData = [
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
    "ru":"Недавний не старше 5-ти лет"
  },
  {
    "ru":"Капитальный не старше 2-ух лет"
  },
  {
    "ru":"Уникальный дизайн не старше 2-ух лет"
  },
];
export const facilityTypesState = {
  id: facilityTypeState,
  name: 'Состояние',
  types: getTypes(facilityTypeState, facilityTypeStateData)
};

// ======================================== FACILITY TYPES @ ADDITIONAL
export const facilityTypeAdditional = getId();
const facilityTypeAdditionalData = [
  {
    "ru":"Подходит людям с ограниченными возможностями"
  },
  {
    "ru":"Подходит для детей (2-12 лет)"
  },
  {
    "ru":"Подходит для младенцев (до 2 лет)"
  },
  {
    "ru":"Посуда"
  },
  {
    "ru": "Сушилка для белья"
  },
  {
    "ru": "Запас бытовой химии"
  }
];
export const facilityTypesAdditional = {
  id: facilityTypeAdditional,
  name: 'Дополнительно',
  types: getTypes(facilityTypeAdditional, facilityTypeAdditionalData)
};

// ======================================== FACILITY TYPES @ ENTRY POINT
export const facilitiesTypes = [
  facilityTypesMedia, facilityTypesCommon, facilityTypesAppliances,
  facilityTypesFurniture, facilityTypesStuff,
  facilityTypesSafety, facilityTypesState,
  facilityTypesAdditional
];
