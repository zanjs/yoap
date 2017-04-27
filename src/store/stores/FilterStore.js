import { observable, computed, action, extendObservable } from 'mobx'
import { localStore, isEmpty, extend } from 'helpers'
import {
  store as config,
  facilityType,
  objectTypes, facilitiesTypes,
  amenitiesTypes, rulesTypes,
  termTypes, categoryTypes,
  stateTypes, furnitureTypes,
  facilityTypeCommon
} from 'constants'
import { store } from 'store'

class FilterStore {
  storeName = config.filter;
  @observable category;
  @observable state = [];
  @observable furniture = [];
  @observable rooms = [1,2,3,4,5,6,7,8,9,10];
  @observable size =  {
    @observable rooms: [],
    @observable bathrooms: 0,
    @observable bedrooms: 0,
    @observable beds: 0,

    @observable squares: [0, 100],
    @observable squaresLimit: [0, 100]
  };
  @observable floor  = 0;
  @observable price  = [];
  @observable priceLimit = [];
  @observable stations = [];

  @action setSquares = data => {
    const { squaresLimit } = this.size;
    if (squaresLimit[0] > data[0] || squaresLimit[1] > data[1]) {
      return false;
    }

    this.size.squaresLimit.replace(data);
  };

  @action setPrice = data => {
    const { priceLimit } = this;
    if (priceLimit[0] > data[0] || priceLimit[1] > data[1]) {
      return false;
    }

    this.priceLimit.replace(data);
  };

  @action replaceStations = stations => {
    this.stations.replace(stations || []);
  };

  @action toggleRooms = room => {
    const savedRoom = this.size.rooms.find(
      item => item === room
    );

    if (typeof savedRoom === 'number') {
      return this.size.rooms.remove(room)
    }

    return this.size.rooms.push(room);
  };

  @action changePrice = price => {
    this.price.replace(price);
  };

  @action sizeChange = (prop, value) => {
    this.size[prop] = value;
  };
  @action squaresChange = value => {
    this.size.squares.replace(value);
  };
  @action floorChange = value => {
    this.floor = value;
  };

  getActiveParametersFromData = params => {
    const lastElement = this.data.length - 1;
    const data = this.data.filter((item, index) => (
      index !== 0 && index !== lastElement
    ));

    return data.map((item, key) => {
      const types = item.types.map((type, index) => {
        const paramIndex = params.findIndex(param => param.id === type.id);

        type.isActive = paramIndex >= 0;

        return type;
      });

      return {
        ...item,
        types
      }
    });
  };

  configureTypes = data => {
    const configure = ({isActive, ...rest}) => ({
      ...rest,
      @observable isActive: false
    });

    return data.map(configure)
  };
  configureData = data => ({
    ...data,
    @observable types: this.configureTypes(data.types)
  });
  configureFacilities = data => {
    let types = [];

    data.forEach(item => {
      types = [
        ...types,
        ...item.types
      ]
    });

    return {
      name: 'Удобства',
      id: facilityType,
      types: this.configureTypes(types)
    }
  };

  constructor() {
    extendObservable(this, {
      types: categoryTypes,
      data: [
        this.configureData(objectTypes),
        this.configureData(stateTypes),
        this.configureFacilities(facilitiesTypes),
        this.configureData(furnitureTypes),
        this.configureData(amenitiesTypes),
        this.configureData(rulesTypes),
        this.configureData(termTypes)
      ]
    });

    // set default category
    this.setCategory(categoryTypes[2]);
  }

  @computed get cleanTypes() {
    let max = this.data.length - 1;
    let data = this.data.filter(
      (i, index) => index !== 0 && index !== max
    );

    return data.map(item => ({
      ...item,
      types: item.types.map(_item => {
        const isCommon = _item.id.indexOf(facilityTypeCommon) !== -1;
        let index;

        if (isCommon) {
          const _index = _item.id[_item.id.length - 1];
          index = parseInt(_index, 10);
        }

        return {
          ..._item,
          isActive: isCommon && index < 5
        }
      })
    }));
  }

  @computed get cleanSize() {
    return {
      size: {
        rooms: 0,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        squares: 0,
      },
      floors: [0,0],
    }
  }

  @computed get activeParams() {
    let params = [];

    this.data.forEach(item => {
      item.types.forEach(type => {
        if (type.isActive)
          params.push(type.id);

      })
    });

    return params;
  }

  @action setCategory = data => {
    const ids = data.types.required.map(item => item.id);
    const _data = this.data.map(item => {
      const types = item.types.map(type => {
        const isActive = !!ids.find(id => id === type.id);

        return {
          ...type,
          isActive
        }
      });
      return {
        ...item,
        types
      }
    });

    this.category = data;
    this.data.replace(_data)
  };

  @computed get filters() {
    const params = this.activeParams;
    const type = params.find(
      param => param.indexOf(objectTypes.id) !== -1
    );
    const termType = params.find(
      param => param.indexOf(termType) !== -1
    );

    return {
      price: this.price,
      termType, type,
      stations: this.stations.map(it => it.id),
      size: this.size,
      params: this.activeParams
    }
  };
  @action find = () => {
    store.items.fetchFilteredItems(this.filters, () => {
      console.log('loaded!');
    });
  }

  fetchItems = cb => {
    //store.items.fetchFilteredItems()
  }

  createNew = data => {
    const validatedData = this.validate(data);

    if (validatedData) {

    }
  };

  validate = data => {

  };

  clearCompleted = () => {
    this.data = this.data.filter(
      todo => !todo.completed
    );
  };

  removeAll = () => {
    this.data.replace([]);
  };

  newModel = data => ItemModel.fromJS(
    this.data,

    data
  );

  add = data => {
    let isExist = null;

    this.data.forEach((item, index) => {
      if (item.id === data.id) {
        isExist = index;
      }
    });

    if (isExist != null) {
      return this.data[isExist] = this.newModel(data);
    }

    this.data.push(
      this.newModel(data)
    );
  };
  replace = () => {

  };
  toJSON = () => this.data.map(todo => todo.toJSON());
  fromJSON = data => data.forEach(item => this.add(item));


  subscribeToLocalStorage = () => reaction(
    // parse data to json
    () => this.toJSON(),

    // save to the local store
    data => localStore.set(this.storeName, data)
  );
}


export default new FilterStore();
