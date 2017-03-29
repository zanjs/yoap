class SubwayLine {
  constructor({color, id, data}) {
    this.color = color;
    this.id = id;
    this.data = this.convertData(data);
  }
  convertData = data => {
    const { id, color } = this;

    return data.map((name, index) => {
      const hidden =
        name.indexOf('@') !== -1;

      return {
        name: name.replace('@', ''),
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
    "Девяткино", "Гражданский проспект", "Академическая",
    "Политехническая", "Площадь Мужества", "Лесная", "Выборгская",
    "Площадь Ленина", "Чернышевская", "Площадь Восстания", "Владимирская",
    "Пушкинская", "Технологический институт", "Балтийская", "Нарвская",
    "Кировский завод", "Автово", "Ленинский проспект", "Проспект Ветеранов"
  ]
});

const secondLine = new SubwayLine({
  color: '#4466AD',
  id: 'spb-id2-',
  data: [
    "Парнас", "Проспект Просвещения", "Озерки", "Удельная",
    "Пионерская", "Чёрная речка", "Петроградская", "Горьковская",
    "Невский проспект", "Сенная площадь", "Технологический институт",
    "Фрунзенская", "Московские ворота", "Электросила", "Парк Победы",
    "Московская", "Звёздная", "Купчино"
  ]
});

const thirdLine = new SubwayLine({
  color: '#73AD56',
  id: 'spb-id3-',
  data: [
    "Беговая@", "Новокрестовская@", "Приморская","Василеостровская",
    "Гостиный двор","Маяковская", "Площадь Александра Невского",
    "Елизаровская","Ломоносовская", "Пролетарская","Обухово","Рыбацкое"
  ]
});

const fourthLine = new SubwayLine({
  color: '#EAB130',
  id: 'spb-id4-',
  data: [
    "Горный институт@", "Театральная@","Спасская","Достоевская",
    "Лиговский проспект", "Площадь Александра Невского","Новочеркасская",
    "Ладожская", "Проспект Большевиков","Улица Дыбенко"
  ]
});

const fifthLine = new SubwayLine({
  color: '#69358F',
  id: 'spb-id5-',
  data: [
    "Комендантский проспект","Старая Деревня","Крестовский остров",
    "Чкаловская","Спортивная","Адмиралтейская","Садовая","Звенигородская",
    "Обводный канал","Волковская","Бухарестская","Международная",
    "Проспект Славы","Дунайская","Шушары"
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

export default data;
