import cyrillicToTranslit from 'cyrillic-to-translit-js'
import randomNumber from 'helpers/app/randomNumber'

const getCategoryName = category => {
  const cat = parseInt(category[category.length - 1], 10);

  switch (cat) {
    case 0:
      return 'min';
    case 1:
      return 'base';
    case 2:
      return 'comfort';
    case 3:
      return 'extended';
    case 4:
      return 'lux'
  }
};

const createItemUrl = ({title, category, size}) => {
  let result = '';
  let _title = cyrillicToTranslit().transform(title);

  result += size && size.rooms ? `${size.rooms}k` : 'studio';

  if (category) {
    result += `-${getCategoryName(category)}`;
  }

  if (title) {
    result += `-${_title}`.replace(
      new RegExp(' ', 'gi'), '-'
    );
  }

  return (result + '-' + parseInt(randomNumber(1000, 9999)))
    .toLowerCase();
};

export default createItemUrl;
