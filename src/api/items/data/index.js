// TODO: add common params
// TODO: rewrite address object

import {
  categoryTypeMin, categoryTypeBase,
  categoryTypeComfort, categoryTypeExtended,
  categoryTypeLux
} from 'constants/itemConstants'
import images from './images'

const data =  [
  {
    id: 'df1c7b20-8490-4217-8be1-903cc3f17617',
    title: "3-к квартира, 72м2, 4/12 эт.",
    price: {
      deposit: 17500,
      amount: 35000
    },
    size: {
      rooms: 3,
      bedrooms: 0,
      bathrooms: 1,

      squares: {
        total: 72,
        living: 34
      },
    },
    floors: [4, 12],

    location: {
      address: 'Дунайский пр-кт д.3к.3, Звёздное, Санкт-Петербург',
      subway: [
        {
          name: 'Звездная',
          distance: 1.3
        }
      ],
      timing: {
        center: 30,
        subway: 10
      }
    },
    images: images[0],
    description: `Сдам квартиру в хорошем состоянии,только минимум кухонной мебели.Для семьи с детьми,для двух семей с детьми.С\узел раздельный,комнаты изолированные 17+14+12м.,кухня 9м.Гардеробная.Развитая инфраструктура.К.у.оплачиват наниматель.Возможно для граждан ближнего зарубежья,без вредных привычек.`,
    user: {
      id: '55fb55df-7986-4515-803f-1dacfeddd92a',
      username: 'Наталья'
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
    title: "Студия, 32м2, 4/15 эт.",
    price: {
      deposit: 26000,
      amount: 26000
    },
    size: {
      rooms: 0,
      bathrooms: 1,

      squares: {
        total: 32,
        living: 23
      },
    },
    floors: [4, 15],

    location: {
      address: 'Заставская 44, Московская застава, Санкт-Петербург',
      subway: [
        {
          name: 'Московские ворота',
          distance: 0
        }
      ],
      timing: {
        center: 20,
        subway: 5
      }
    },
    images: images[1],
    description: `Новый дом. Консьерж. Охрана. Закрытый двор, видеонаблюдение. Хороший ремонт. Балкон.
Мебель: кухонный гарнитур, стол, стулья, раскладывающийся диван, шкаф.
Бытовая техника: электро плита, холодильник, стиральная машина.
ЖКУ оплачивается отдельно.`,
    user: {
      id: '876cee68-2241-48b1-8224-52a8ffb50945',
      username: 'Николай'
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
    title: "Студия, 35м2, 11/18 эт.",
    price: {
      deposit: 11750,
      amount: 23500
    },
    size: {
      rooms: 0,
      bathrooms: 1,

      squares: {
        total: 35,
        living: 23
      },
    },
    floors: [11, 18],

    location: {
      address: 'ул Варшавская, 16, Московская застава, Санкт-Петербург',
      subway: [
        {
          name: 'Электросила',
          distance: 0.37
        }
      ],
      timing: {
        center: 18,
        subway: 5
      }
    },
    images: images[2],
    description: `Сдается однушка в московском районе в шаговой доступности от метро.Развитая инфраструктура.Ремонт был сделан для себя,жили год сами.Хорошая шумоизоляция.Вся необходимая техника и мебель.Посудомоечная машина bosch,дорогая душевая кабина.Все работает на ура.Рассмотрю пару славянская внешности или двух порядочных девушек.`,
    user: {
      id: '876cee68-2241-48b1-8224-52a8ffb50945',
      username: 'Николай'
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
    title: "Студия, 50м2, 11/18 эт.",
    price: {
      deposit: 35000,
      amount: 35000
    },
    size: {
      rooms: 1,
      bathrooms: 1,

      squares: {
        total: 50,
        living: 39
      },
    },
    floors: [11, 18],

    location: {
      address: 'Шушары, вилеровский 6, Гагаринское, Санкт-Петербург',
      subway: [
        {
          name: 'Купчино',
          distance: 0
        }
      ],
      timing: {
        center: 35,
        subway: 5
      }
    },
    images: images[3],
    description: `Квартира в скандинавском стиле (очень стильная, светлая и позитивная). Рядом с Финским заливом (летом оцените). Из окон хороший вид. 2 застекленных лоджии. Солнечная сторона. Прямо в доме универсам + еще один продуктовый магазин, где горячий вкусный кофе с собой и выпечка, салон красоты. Перед домом фитнес центр и круглосуточный гипермаркет Spar, то есть продукты покупать очень удобно. Рядом есть всё, что нужно. Остановка близко, транспорт ходит очень часто. Подземная парковка в доме + на улице. В квартире никто не жил. Очень хорошая качественная отделка - всё абсолютно новое. В доме консьерж, домофон, видеонаблюдение. Выделенная скоростная линия интернета, Wi-Fi. Из техники: микроволновка, варочная панель, встроенный холодильник , HD ЖК телевизор 32 дюйма с USB медиаплеером (можно смотреть фильмы с флешки), кофемашина, компактная итальянская стиральная машина под раковиной. Вся сантехника стильная, мебель вся дизайнерская: стулья и кресло, табуреты, 2 дивана 3-х местных, много декора, модные ковры, подвесное кресло шведское в маленькой лоджии, хорошая уютная кухня и т. п. В санузле стеклянная душевая перегородка с подсветкой, тропический душ встроен в потолок с подсветкой, душ с термостатом, освещение перед зеркалом регулируется сенсорным диммером. Хороший австрийский ламинат под массивную доску. Много антресолей и шкафов в кухне, прихожей и в большой комнате с системой открывания пуш (на нажатие, без ручек) - вся мебель встроенная, не бросается в газа (как-будто стены). Входную дверь поменяли на надежную металлическую (взломостойкая, усиленная, замки также надежные). Кого ищем: интеллигентных граждан РФ от 28 лет и старше. Желательно с регистрацией в С-Пб или Лен. области, без детей со стабильным доходом. Сдается официально по договору. 37 т. р. в месяц + КУ. С месячным залогом (возвращается в конце) . От собственника. В январе: если заплатите за 4 или более месяцев сразу то будет по 35+КУ за них. Без комиссии.`,
    user: {
      id: '563a25cf-d83c-48c0-ae83-b37a8063b92a',
      username: 'Елена'
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
    title: "10-к дом, 300м2, 3 эт.",
    price: {
      deposit: 350000,
      amount: 350000
    },
    size: {
      rooms: 10,
      bathrooms: 4,

      squares: {
        total: 300,
        living: 250
      },
    },
    floors: [3],

    location: {
      address: 'Васкелово,Западная наб., Чкаловское, Санкт-Петербург',
      timing: {
        center: 65,
        subway: 42
      }
    },
    images: images[4],
    description: `Коттедж в 35 км от Санкт-Петербурга по Новоприозёрскому шоссе, на берегу Лемболовского озера , свой выход к воде.Сдаётся на лето, от собственника.
Особняк окружает сосновый бор. Экологически чистая зона. На участке в пятьдесят соток ландшафтный дизайн, фруктовые деревья и кусты, цветники.
Дом оформлен в классическом стиле, авторский дизайн, венецианская штукатурка, лепные потолки, изразцовые камины, мраморные полы с подогревом, четыре спальни, каминный зал, кухня-столовая, кабинет, три санузла, джаккузи, бильярдная, веранда и балкон с видом на озеро.
Отдельное здание с русской баней, бассейном, летней столовой, террасой, барбекю.
Автономное жизнеобеспечение с техническим обслуживанием, система очистки воды, резервный дизель.`,
    user: {
      id: '49834a0a-22c9-4e08-8af0-94faeb5954a7',
      username: 'Екатерина'
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

export default data;
