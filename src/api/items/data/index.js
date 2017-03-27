import {
  categoryTypeMin, categoryTypeBase,
  categoryTypeComfort, categoryTypeExtended,
  categoryTypeLux, termTypes
} from 'constants/itemConstants'
import images from './images'

const data =  [
  {
    id: 'df1c7b20-8490-4217-8be1-903cc3f17617',
    title: "Отличный вариант под ремонт",
    link: "3k-min-otlichnyi-variant-pod-remont-0213",
    price: [
      {
        id: termTypes.types[0].id,
        value: 2100,
        deposit: 2100
      },
      {
        id: termTypes.types[2].id,
        value: 35000,
        deposit: 17500
      }
    ],
    rating: 3,
    size: {
      rooms: 3,
      bedrooms: 0,
      bathrooms: 1,

      squares: 72,
    },
    floors: [4, 12],

    location: {
      address: 'Дунайский пр-кт д.3к.3, Звёздное, Санкт-Петербург',
      location: [59.8282439, 30.3279568],
      subway: [
        {
          name: 'Звездная',
          distance: 1.3,
          time: 10
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

    images: images[0],
    description: `Сдам квартиру в хорошем состоянии,только минимум кухонной мебели.Для семьи с детьми,для двух семей с детьми.С\узел раздельный,комнаты изолированные 17+14+12м.,кухня 9м.Гардеробная.Развитая инфраструктура.К.у.оплачиват наниматель.Возможно для граждан ближнего зарубежья,без вредных привычек.`,
    user: {
      id: '55fb55df-7986-4515-803f-1dacfeddd92a',
      name: 'Наталья'
    },
    views: 100,

    params: [
      categoryTypeMin, "OBJECT_TYPE@1", "TERM_TYPE@1",
      "FACILITY_TYPE@1-0", "FACILITY_TYPE@1-1", "FACILITY_TYPE@1-2",
      "FACILITY_TYPE@1-3",
      "FACILITY_TYPE@2-1", "FACILITY_TYPE@3-3",
      "FACILITY_TYPE@6-1",
      "TERM_TYPE@0", "TERM_TYPE@1",
      "RULES_TYPE@2",

      "AMENITY_TYPE@0", "AMENITY_TYPE@9"
    ]
  },
  {
    id: '814d68ea-a517-4525-b72d-78253bf4de2d',
    title: "Уютная студия для пары",
    link: "studio-base-yutnaya-studia-dlya-pari-3124",
    price: [
      {
        id: termTypes.types[0].id,
        value: 2100,
        deposit: 2100
      },
      {
        id: termTypes.types[2].id,
        value: 26000,
        deposit: 26000
      }
    ],
    rating: 3,
    size: {
      rooms: 0,
      bathrooms: 1,

      squares: 32
    },
    floors: [4, 15],

    location: {
      address: 'Заставская 44, Московская застава, Санкт-Петербург',
      location: [59.8887306, 30.318576],
      subway: [
        {
          name: 'Московские ворота',
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
    images: images[1],
    description: `Новый дом. Консьерж. Охрана. Закрытый двор, видеонаблюдение. Хороший ремонт. Балкон.
Мебель: кухонный гарнитур, стол, стулья, раскладывающийся диван, шкаф.
Бытовая техника: электро плита, холодильник, стиральная машина.
ЖКУ оплачивается отдельно.`,
    user: {
      id: '876cee68-2241-48b1-8224-52a8ffb50945',
      name: 'Николай'
    },
    views: 253,

    params: [
      categoryTypeBase, "OBJECT_TYPE@2", "TERM_TYPE@0", "TERM_TYPE@1",

      "FACILITY_TYPE@0-0", "FACILITY_TYPE@0-1", "FACILITY_TYPE@0-2",
      "FACILITY_TYPE@1-0", "FACILITY_TYPE@1-1", "FACILITY_TYPE@1-2",
      "FACILITY_TYPE@2-0", "FACILITY_TYPE@2-1", "FACILITY_TYPE@2-4",
      "FACILITY_TYPE@4-0", "FACILITY_TYPE@4-1", "FACILITY_TYPE@4-2",
      "FACILITY_TYPE@5-0",

      "AMENITY_TYPE@0", "AMENITY_TYPE@9",

      "RULES_TYPE@0", "RULES_TYPE@2"
    ]
  },
  {
    id: 'f0391003-1a27-4bb1-aa63-d2745a149673',
    title: "Комфортная студия для двоих",
    link: "studio-comfort-komfortnaya-studia-dlya-dvoih-6754",
    price: [
      {
        id: termTypes.types[0].id,
        value: 1500,
        deposit: 2100
      },
      {
        id: termTypes.types[2].id,
        value: 23500,
        deposit: 11750
      }
    ],
    rating: 3,
    size: {
      rooms: 0,
      bathrooms: 1,

      squares: 35
    },
    floors: [11, 18],

    location: {
      address: 'ул Варшавская, 16, Московская застава, Санкт-Петербург',
      location: [59.8766179, 30.3136879],
      subway: [
        {
          name: 'Электросила',
          distance: 0.37,
          time: 7
        }
      ],
      timing: [
        {
          name: 'Центр',
          type: 'center',
          time: 18,
          distance: 5000
        },
        {
          name: 'Работа',
          type: 'work',
          time: 21,
          distance: 7000
        },
      ]
    },

    images: images[2],
    description: `Сдается однушка в московском районе в шаговой доступности от метро.Развитая инфраструктура.Ремонт был сделан для себя,жили год сами.Хорошая шумоизоляция.Вся необходимая техника и мебель.Посудомоечная машина bosch,дорогая душевая кабина.Все работает на ура.Рассмотрю пару славянская внешности или двух порядочных девушек.`,
    user: {
      id: '876cee68-2241-48b1-8224-52a8ffb50945',
      name: 'Николай'
    },
    views: 253,

    params: [
      categoryTypeComfort, "OBJECT_TYPE@2", "TERM_TYPE@0", "TERM_TYPE@1",

      "FACILITY_TYPE@0-0", "FACILITY_TYPE@0-1", "FACILITY_TYPE@0-2",
      "FACILITY_TYPE@1-0", "FACILITY_TYPE@1-1", "FACILITY_TYPE@1-2",
      "FACILITY_TYPE@2-0", "FACILITY_TYPE@2-1", "FACILITY_TYPE@2-2",
      "FACILITY_TYPE@2-4", "FACILITY_TYPE@2-5", "FACILITY_TYPE@2-6",
      "FACILITY_TYPE@2-7", "FACILITY_TYPE@2-8", "FACILITY_TYPE@3-1",
      "FACILITY_TYPE@3-1", "FACILITY_TYPE@4-2", "FACILITY_TYPE@7-1",
      "FACILITY_TYPE@7-3",

      "FACILITY_TYPE@6-3",

      "AMENITY_TYPE@0",

      "RULES_TYPE@0",
    ]
  },
  {
    id: 'fad4c8ed-897e-4b9c-b260-769874d4a562',
    title: "Светлая квартира в скандинавском стиле",
    link: "1k-extended-svetlaya-kvartira-v-skandinavskov-stile-5612",
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
    images: images[3],
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
  },
  {
    id: '48738892-740b-42f9-809d-ff5b810d9f05',
    title: "Элитный дом",
    link: "house-lux-elitnyi-dom-1612",
    price: {
      deposit: 350000,
      amount: 350000
    },
    size: {
      rooms: 10,
      bathrooms: 4,

      squares: 300
    },
    floors: [3],
    rating: 5,

    location: {
      address: 'Васкелово,Западная наб., Чкаловское, Санкт-Петербург',
      location: [60.3946389, 30.3588174],
      timing: [
        {
          name: 'Центр',
          type: 'center',
          time: 77,
          distance: 110000
        },
        {
          name: 'Работа',
          type: 'work',
          time: 98,
          distance: 120000
        },
      ]
    },
    images: images[4],
    description: `Коттедж в 35 км от Санкт-Петербурга по Новоприозёрскому шоссе, на берегу Лемболовского озера , свой выход к воде.Сдаётся на лето, от собственника.
Особняк окружает сосновый бор. Экологически чистая зона. На участке в пятьдесят соток ландшафтный дизайн, фруктовые деревья и кусты, цветники.
Дом оформлен в классическом стиле, авторский дизайн, венецианская штукатурка, лепные потолки, изразцовые камины, мраморные полы с подогревом, четыре спальни, каминный зал, кухня-столовая, кабинет, три санузла, джаккузи, бильярдная, веранда и балкон с видом на озеро.
Отдельное здание с русской баней, бассейном, летней столовой, террасой, барбекю.
Автономное жизнеобеспечение с техническим обслуживанием, система очистки воды, резервный дизель.`,
    user: {
      id: '49834a0a-22c9-4e08-8af0-94faeb5954a7',
      name: 'Екатерина'
    },
    views: 105,

    params: [
      categoryTypeLux, "OBJECT_TYPE@0", "TERM_TYPE@1",

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
  },
];

window.data = data;

export default data;
