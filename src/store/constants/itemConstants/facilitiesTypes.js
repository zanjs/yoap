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
  },
  {
    "ru":"Климат-контроль"
  },
  {
    "ru":"Теплый пол"
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

// ======================================== FACILITY TYPES @ ADDITIONAL
export const facilityTypeAdditional = getId();
const facilityTypeAdditionalData = [
  {
    "ru":"Посуда"
  },
  {
    "ru": "Сушилка для белья"
  },
  {
    "ru": "Запас бытовой химии"
  },
  {
    "ru":"Подходит для детей (2-12 лет)"
  },
  {
    "ru":"Подходит для младенцев (до 2 лет)"
  },
  {
    "ru":"Подходит людям с ограниченными возможностями"
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
  facilityTypesStuff, facilityTypesSafety, facilityTypesAdditional
];
