import { Item } from 'models'
import { formatItemsResponse, isEmpty } from 'utils'
import { termTypes } from 'constants/itemConstants/termTypes'
import { statusTypes } from 'constants/itemConstants/statusTypes'
import { objectType } from 'constants/itemConstants/objectTypes'
import { categoryType } from 'constants/itemConstants/categoriesTypes'
import { sortConfig } from 'serverConfig'

const filterByPrice = (price, item, termType = termTypes.types[2].id) => {
  if (isEmpty(price) || price[0] === price[1])
    return true;

  let result = false;
  const itemPrice = item.price.find(
    it => it.id === termType
  );

  // check if termType not exist
  if (!itemPrice) {
    return false;
  }

  const [min, max] = price;
  const { value } = itemPrice;

  if (min) {
    if (value >= min) {
      result = true;
    } else {
      return false;
    }
  }
  if (max) {
    if (value <= max) {
      result = true;
    } else {
      return false;
    }
  }
  return result;
};
const filterBySize = (size, item) => {
  if (isEmpty(size))
    return true;

  const {
    bathrooms,
    beds,
    bedrooms,
    rooms,
    squares
  } = size;

  const itemSize = item.size;

  if (bathrooms && itemSize.bathrooms < bathrooms) {
    return false;
  }
  if (beds && itemSize.beds < beds) {
    return false;
  }
  if (bedrooms && itemSize.bedrooms < bedrooms) {
    return false;
  }
  if (squares) {
    const [min, max] = squares;
    const itemSquares = itemSize.squares;

    if (min !== max) {
      if (min && itemSquares < min) {
        return false;
      } else if (max && itemSquares > max) {
        return false;
      }
    }
  }

  if (rooms && rooms.length) {
    const itemRooms = itemSize.rooms;
    const foundRoom = rooms.find(room => room === itemRooms);

    if (!foundRoom) {
      return false;
    }
  }

  return true;
};
const filterByStation = (stations, item) => {
  if (!stations || !stations.length)
    return true;

  const itemStations = item.location.subway;
  if (itemStations && itemStations[0]) {
    const id = itemStations[0].id;
    const result = stations.find(it => it === id);

    return !!result;
  }

  return false;
};
const filterByParams = (params, item) => {
  if (!params || !params.length)
    return true;

  let isMatched;
  const itemParams = item.params;

  params.forEach(param => {
    if (param.indexOf(objectType) !== -1)
      return;

    if (param.indexOf(categoryType) !== -1)
      return;

    if (isMatched === false)
      return;

    const result = !!itemParams.find(__param => __param === param);

    if (!result) {
      return isMatched = false;
    }

    isMatched = true;
  })

  return isMatched
};
const createFilter = filters => item => {
  const {
    price, termType,
    stations,
    size, params
  } = filters;

  let result = false;

  if (price) {
    const filteredByPrice = filterByPrice(price, item, termType)

    if (filteredByPrice) {
      result = true;
    } else {
      return false;
    }
  }
  if (size) {
    const filteredBySize = filterBySize(size, item);

    if (filteredBySize) {
      result = true;
    } else {
      return false;
    }
  }
  if (stations) {
    const filteredByStations = filterByStation(stations, item);

    if (filteredByStations) {
      result = true;
    } else {
      return false;
    }
  }
  if (params) {
    const filteredByParams = filterByParams(params, item);

    if (filteredByParams) {
      result = true;
    } else {
      return false;
    }
  }

  return result;
};
const filterData = (filters, pureData) => {
  const filter = createFilter(filters);
  return pureData.filter(filter)
};

export default (req, res) => {
  const { type } = req.body;

  let query = {
    status: statusTypes.types[1].id
  };

  if (type) {
    query.type = type;
  }

  Item.find(query)
    .sort(sortConfig)
    .then(pureData => {
      const data = filterData(req.body, pureData);

      res.status(200).json(
        formatItemsResponse(data)
      )
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
};
