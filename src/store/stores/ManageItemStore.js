import { observable } from 'mobx'
import { extend, isEmpty, keys } from 'helpers'
import { store } from 'store'
import { isValid } from 'validation/itemValidation'


class ManageItemStore {
  @observable errors = {};
  @observable data = {};

  constructor = () => {
    this.CreateNew();
  };

  CreateNew = () => {
    this.data = {
      @observable id: '',
      @observable title: '',
      @observable description: '',
      @observable link: '',

      @observable views: 0,
      @observable rating: 0,

      @observable category: '',
      @observable type: '',
      @observable status: '',
      @observable user: {},

      @observable location: {
        address: '',
        location: [],
        timing: [],
        subway: []
      },
      @observable size: {
        @observable rooms: 0,
        @observable bathrooms: 0,
        @observable bedrooms: 0,
        @observable beds: 0,

        @observable squares: 0,
      },
      @observable floors: [],
      @observable price: [],
      @observable dewa: 0,
      @observable params: [],
      @observable images: {
        thumbnail: {},
        gallery: []
      },
    };
  };
  Import = __object => {
    const object = __object.toJSON
      ? __object.toJSON() : __object;

    if (isEmpty(this.data))
      this.CreateNew();

    // object title
    if (object.title)
      this.data.title = object.title;
    // object description
    if (object.description)
      this.data.description = object.description;
    // object link
    if (object.link)
      this.data.link = object.link;
    // object id
    if (object.id || object._id)
      this.data.id = object.id || object._id;
    // object category
    if (object.category)
      this.data.category = object.category;
    // object size
    if (object.size) {
      this.data.size = {
        ...object.size,
      };
    }
    // object price
    if (object.price)
      this.data.price = [...object.price];
    // object status
    if (object.status)
      this.data.status = object.status;
    // object type
    if (object.type)
      this.data.type = object.type;
    // object dewa
    if (object.dewa)
      this.data.dewa = object.dewa;
    // object floors
    if (object.floors && object.floors.length)
      this.data.floors.replace([...object.floors]);
    // object location
    if (object.location) {
      const loc = object.location;

      loc.address && (this.data.location.address = loc.address);
      loc.location && (this.data.location.location.replace([...loc.location]));
      loc.subway && (this.data.location.subway.replace([...loc.subway]));
      loc.timing && (this.data.location.timing.replace([...loc.timing]));
    }
    // object images
    if (object.images)
      this.data.images = {...object.images};
    // object rating
    if (object.rating)
      this.data.rating = object.rating;
    // object views
    if (object.views)
      this.data.views = object.views;
    // object user
    if (object._userData || object._creator)
      this.data.user = object._creator;
    // object params
    if (object.params) {
      this.data.params.replace(
        this.parseParams(object.params)
      )
    }
  };
  Validate = () => {
    const errors = keys(this.data, (value, prop, result) => {
      const validation = isValid(prop, value) || {};
      let error = {};

      console.log(`validation ${prop}`, validation);

      if (validation.isError) {
        error = {
          [prop]: validation.message
        }
      }

      return {
        ...result,
        ...error
      };
    });

    if (errors) {
      return this.errors = errors;
    }

    return errors;
  };
  Send = cb => {
    this.Validate();

    if (!isEmpty(this.errors)) {
      const { errors } = this;
      const message = Object.keys(this.errors).map(prop => {
        return errors[prop];
      }).join(' \n');

      return alert(message)
    }

    let data = {...this.data};

    if (!data.user || !data._creator) {
      data._creator = store.user.id;
    }

    data.images = {
      thumbnail: data.images[0],
      gallery: data.images
    };

    data.params = this.getParams();

    window.testData = data;
    store.items.createItem(data, cb);
  };

  // helpers
  getParams = () => {
    let params = [];

    this.data.params.forEach(item => {
      item.types.forEach(type => {
        if (type.isActive) {
          params.push(type.id);
        }
      })
    });

    return params;
  };
  changeData = change => {
    if (typeof change === 'function') {
      return extend(this.data, change(this.data));
    }

    return extend(this.data, change);
  };
  // set active parameters of object
  parseParams = params => {
    const types = store.filter.cleanTypes;
    const checkActive = id => !!params.find(
      param => !!param && (param.id || param) === id
    );

    return types.map(item => ({
      ...item,
      types: item.types
        .filter(_item => !!_item && !!_item.id)
        .map(type => {
          const res = checkActive(type.id);
          if (res) {
            return {
              ...type,
              isActive: true
            }
          }

          return type;
        })
    }))
  };
}

export default new ManageItemStore();
