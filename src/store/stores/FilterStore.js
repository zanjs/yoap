import { observable, computed, action, extendObservable } from 'mobx'
import { localStore, isEmpty, extend } from 'helpers'
import {
  store as config,
  objectTypes, facilitiesTypes,
  amenitiesTypes, rulesTypes,
  termTypes, categoryTypes,
  stateTypes, furnitureTypes
} from 'constants'

console.log({
  objectTypes,
  facilitiesTypes,
  amenitiesTypes,
  rulesTypes,
  termTypes,
  categoryTypes,
  stateTypes,
  furnitureTypes
});

const log = data => {
  console.log('log', data);
  return data;
};

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

    @observable squares: {
      @observable total: [0, 100],
      @observable living: []
    },
  };
  @observable floor  = 0;
  @observable price  = [];
  @observable stations = [];

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

  @action sizeChange = (prop, value) => {
    this.size[prop] = value;
  };
  @action squaresChange = (prop, value) => {
    this.size.squares[prop].replace(value);
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
    })
  }

  @action setCategory = data => {
    this.category = data;
  };

  fetchItems = cb => getItems().then(resp => cb(resp.json()));

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
