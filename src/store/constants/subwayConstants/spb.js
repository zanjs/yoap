class SubwayLine {
  constructor({color, id, data}) {
    this.color = color;
    this.id = id;
    this.data = this.convertData(data);
  }
  convertData = data => {
    const { id, color } = this;

    return data.map(({name, location}, index) => {
      const hidden =
        name.indexOf('@') !== -1;

      return {
        name: name.replace('@', ''),
        location,
        color,
        id: `${id}${index + 1}`,
        hidden
      }
    })
  };
}

const firstLine = new SubwayLine({
  color: '#cd2a49',
  id: 'spb-id1-',
  data: [
    {
      name: "Девяткино",
      location: [60.049799, 30.442248]
    },
    {
      name: "Гражданский проспект",
      location: [60.03481, 30.418087]
    },
    {
      name: "Академическая",
      location: [60.012763, 30.395706]
    },
    {
      name: "Политехническая",
      location: [60.008926, 30.370952]
    },
    {
      name: "Площадь Мужества",
      location: [59.999655, 30.366595]
    },
    {
      name: "Лесная",
      location: [59.98477, 30.344201]
    },
    {
      name: "Выборгская",
      location: [59.97111, 30.347553]
    },
    {
      name: "Площадь Ленина",
      location: [59.955725, 30.355957]
    },
    {
      name: "Чернышевская",
      location: [59.944558, 30.359754]
    },
    {
      name: "Площадь Восстания",
      location: [59.931483, 30.36036]
    },
    {
      name: "Владимирская",
      location: [59.927467, 30.347875]
    },
    {
      name: "Пушкинская",
      location: [59.920757, 30.329641]
    },
    {
      name: "Технологический институт",
      location: [59.916799, 30.318967]
    },
    {
      name: "Балтийская",
      location: [59.907245, 30.299217]
    },
    {
      name: "Нарвская",
      location: [59.901169, 30.274676]
    },
    {
      name: "Кировский завод",
      location: [59.879726, 30.261908]
    },
    {
      name: "Автово",
      location: [59.867369, 30.261345]
    },
    {
      name: "Ленинский проспект",
      location: [59.851677, 30.268279]
    },
    {
      name: "Проспект Ветеранов",
      location: [59.84188, 30.251543]
    },
  ]
});

const secondLine = new SubwayLine({
  color: '#4466AD',
  id: 'spb-id2-',
  data: [
    {
      name: "Парнас",
      location: [60.06715, 30.334128]
    },
    {
      name: "Проспект Просвещения",
      location: [60.051416, 30.332632]
    },
    {
      name: "Озерки",
      location: [60.037141, 30.321529]
    },
    {
      name: "Удельная",
      location: [60.016707, 30.315421]
    },
    {
      name: "Пионерская",
      location: [60.002576, 30.296791]
    },
    {
      name: "Чёрная речка",
      location: [59.985574, 30.300792]
    },
    {
      name: "Петроградская",
      location: [59.966465, 30.311432]
    },
    {
      name: "Горьковская",
      location: [59.956323, 30.318724]
    },
    {
      name: "Невский проспект",
      location: [59.935601, 30.327134]
    },
    {
      name: "Сенная площадь",
      location: [59.927090, 30.320378]
    },
    {
      name: "Фрунзенская",
      location: [59.906155, 30.317509]
    },
    {
      name: "Московские ворота",
      location: [59.891924, 30.317751]
    },
    {
      name: "Электросила",
      location: [59.879425, 30.318658]
    },
    {
      name: "Парк Победы",
      location: [59.86659, 30.321712]
    },
    {
      name: "Московская",
      location: [59.852192, 30.322206]
    },
    {
      name: "Звёздная",
      location: [59.833228, 30.349616]
    },
    {
      name: "Купчино",
      location: [59.829887, 30.375399]
    }
  ]
});

const thirdLine = new SubwayLine({
  color: '#73AD56',
  id: 'spb-id3-',
  data: [
    {
      name: "Беговая@",
      location: []
    },
    {
      name: "Новокрестовская@",
      location: []
    },
    {
      name: "Приморская",
      location: [59.948545, 30.234526]
    },
    {
      name: "Василеостровская",
      location: [59.942927, 30.278159]
    },
    {
      name: "Гостиный двор",
      location: [59.934049, 30.333772]
    },
    {
      name: "Маяковская",
      location: [59.931612, 30.35491]
    },
    {
      name: "Площадь Александра Невского",
      location: [59.924314, 30.385102]
    },
    {
      name: "Елизаровская",
      location: [59.896705, 30.423637]
    },
    {
      name: "Ломоносовская",
      location: [59.877433, 30.441951]
    },
    {
      name: "Пролетарская",
      location: [59.865275, 30.47026]
    },
    {
      name: "Обухово",
      location: [59.848795, 30.457805]
    },
    {
      name: "Рыбацкое",
      location: [59.830943, 30.500455]
    }
  ]
});

const fourthLine = new SubwayLine({
  color: '#EAB130',
  id: 'spb-id4-',
  data: [
    {
      name: "Горный институт@",
      location: []
    },
    {
      name: "Театральная@",
      location: []
    },
    {
      name: "Спасская",
      location: [59.926839, 30.319752]
    },
    {
      name: "Достоевская",
      location: [59.928072, 30.345746]
    },
    {
      name: "Лиговский проспект",
      location: [59.920747, 30.355245]
    },
    {
      name: "Новочеркасская",
      location: [59.92933, 30.412918]
    },
    {
      name: "Ладожская",
      location: [59.93244, 30.439474]
    },
    {
      name: "Проспект Большевиков",
      location: [59.919819, 30.466908]
    },
    {
      name: "Улица Дыбенко",
      location: [59.907573, 30.483292]
    },
  ]
});

const fifthLine = new SubwayLine({
  color: '#69358F',
  id: 'spb-id5-',
  data: [
    {
      name: "Комендантский проспект",
      location: [60.008356, 30.258915]
    },
    {
      name: "Старая Деревня",
      location: [59.989228, 30.255169]
    },
    {
      name: "Крестовский остров",
      location: [59.971838, 30.259427]
    },
    {
      name: "Чкаловская",
      location: [59.961035, 30.291964]
    },
    {
      name: "Спортивная",
      location: [59.950365, 30.287356]
    },
    {
      name: "Адмиралтейская",
      location: [59.935877, 30.314886]
    },
    {
      name: "Садовая",
      location: [59.927008, 30.317456]
    },
    {
      name: "Звенигородская",
      location: [59.922304, 30.335784]
    },
    {
      name: "Обводный канал",
      location: [59.914697, 30.349361]
    },
    {
      name: "Волковская",
      location: [59.896265, 30.35686]
    },
    {
      name: "Бухарестская",
      location: [59.883681, 30.369673]
    },
    {
      name: "Международная",
      location: [59.869966, 30.379045]
    },
    {
      name: "Проспект Славы@",
      location: []
    },
    {
      name: "Дунайская@",
      location: []
    },
    {
      name: "Шушары@",
      location: []
    },
  ]
});

const data = [
  firstLine, secondLine,
  thirdLine, fourthLine,
  fifthLine
];

data.find = id => {
  let result = null;

  data.forEach(item => {
    if (id.indexOf(item.id) !== -1) {
      result = item.data.find(
        block => block.id === id
      )
    }
  });

  return result;
};

data.findByName = name => {
  let result = null;

  data.forEach(item => {
    if (result)
      return;

    item.data.forEach(block => {
      if (name.indexOf(block.name) !== -1) {
        result = block;
      }
    });
  });

  return result;
};

export default data;
