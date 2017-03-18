import { observable, computed, action, extendObservable } from 'mobx'
import { localStore, isEmpty, extend } from 'helpers'
import {
  store as config,
  objectTypes, facilitiesTypes,
  amenitiesTypes, rulesTypes,
  termTypes, categoryTypes
} from 'constants'

console.log({
  objectTypes,
  facilitiesTypes,
  amenitiesTypes,
  rulesTypes,
  termTypes,
  categoryTypes
})

const log = data => {
  console.log('log', data);
  return data;
};

class FilterStore {
  storeName = config.filter;
  @observable category;
  @observable rooms = [1,2,3,4,5,6,7,8,9,10];
  @observable size =  {
    @observable rooms: [],
    @observable bathrooms: [],
    @observable bedrooms: [],

    @observable squares: {
      @observable total: [],
      @observable living: []
    },
  };
  @observable floor = [];
  @observable price = [];

  @action toggleRooms = room => {
    const savedRoom = this.size.rooms.find(
      item => item === room
    );

    if (typeof savedRoom === 'number') {
      return this.size.rooms.remove(room)
    }

    return this.size.rooms.push(room);
  };

  configureTypes = data => {
    const configure = ({isActive, ...rest}) => ({
      ...rest,
      @observable isActive: false
    })

    return data.map(configure)
  }
  configureData = data => ({
    ...data,
    @observable types: this.configureTypes(data.types)
  })
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
        this.configureFacilities(facilitiesTypes),
        this.configureData(amenitiesTypes),
        this.configureData(rulesTypes),
        this.configureData(termTypes)
      ]
    })
  }

  @action setCategory = data => {
    this.category = data;
  }

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

  removeAll = f => {
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
