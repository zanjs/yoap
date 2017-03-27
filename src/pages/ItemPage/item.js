import {
  categoryTypeMin, categoryTypeBase,
  categoryTypeComfort, categoryTypeExtended,
  categoryTypeLux, termTypes
} from 'constants/itemConstants'
import images from 'api/items/data/images/fourth'


export default {
  id: 'fad4c8ed-897e-4b9c-b260-769874d4a562',
  title: "Светлая квартира в скандинавском стиле",
  price: [
    {
      id: termTypes.types[0].id,
      value: 2100,
      deposit: 2100
    },
    {
      id: termTypes.types[2].id,
      value: 35000,
      deposit: 35000
    }
  ],
  rating: 4,
  size: {
    rooms: 1,
    bathrooms: 1,

    squares: 50,
  },
  floors: [11, 18],

  location: {
    address: 'Шушары, Вилеровский 6, Гагаринское, Санкт-Петербург',
    location: [59.8103184, 30.362779],
    subway: [
      {
        name: 'Купчино',
        distance: 0,
        time: 5
      }
    ],
    timing: [
      {
        name: 'Центр',
        type: 'center',
        time: 35,
        distance: 11000
      },
      {
        name: 'Работа',
        type: 'work',
        time: 21,
        distance: 7000
      },
    ]
  },
  images,
  description:
    'Квартира в скандинавском стиле (очень стильная, светлая и позитивная). ' +
    '\nРядом с Финским заливом (летом оцените). Из окон хороший вид. 2 застекленных лоджии. Солнечная сторона. ' +
    '\nПрямо в доме универсам + еще один продуктовый магазин, где горячий вкусный кофе с собой и выпечка, салон красоты. ' +
    '\nПеред домом фитнес центр и круглосуточный гипермаркет Spar, то есть продукты покупать очень удобно. ' +
    '\nРядом есть всё, что нужно. Остановка близко, транспорт ходит очень часто. Подземная парковка в доме + на улице. ' +
    '\nВ квартире никто не жил. Очень хорошая качественная отделка - всё абсолютно новое. В доме консьерж, домофон, видеонаблюдение. ' +
    '\nЖелательно с регистрацией в С-Пб или Лен. области, без детей со стабильным доходом. Сдается официально по договору. 37 т. р. в месяц + КУ. ' +
    '\nС месячным залогом (возвращается в конце) . От собственника. В январе: если заплатите за 4 или более месяцев сразу то будет по 35+КУ за них. ' +
    '\nБез комиссии.',

  user: {
    id: '563a25cf-d83c-48c0-ae83-b37a8063b92a',
    name: 'Елена'
  },
  views: 404,

  params: [
    categoryTypeExtended, "OBJECT_TYPE@2", "TERM_TYPE@1",

    "FACILITY_TYPE@0-0", "FACILITY_TYPE@0-1", "FACILITY_TYPE@0-2",
    "FACILITY_TYPE@1-0", "FACILITY_TYPE@1-1", "FACILITY_TYPE@1-2",
    "FACILITY_TYPE@2-0", "FACILITY_TYPE@2-1", "FACILITY_TYPE@2-2",
    "FACILITY_TYPE@2-3", "FACILITY_TYPE@2-4", "FACILITY_TYPE@2-5",
    "FACILITY_TYPE@2-6", "FACILITY_TYPE@2-7", "FACILITY_TYPE@2-8",
    "FACILITY_TYPE@3-1", "FACILITY_TYPE@3-1", "FACILITY_TYPE@4-2",
    "FACILITY_TYPE@5-0", "FACILITY_TYPE@5-1",
    "FACILITY_TYPE@7-1", "FACILITY_TYPE@7-3",

    "FACILITY_TYPE@6-3",

    "AMENITY_TYPE@0", "AMENITY_TYPE@1", "AMENITY_TYPE@8",
    "AMENITY_TYPE@9",

    "RULES_TYPE@0",
  ]
}
