import { observable, computed, action } from 'mobx'
import { extend, isEmpty, keys } from 'helpers'
import { ItemModel } from 'models'
import { store } from 'store'
import { isValid } from 'validation/itemValidation'
import { objectTypes } from 'constants'


class ManageItemStore {
  @observable errors = {};
  @observable data = {};

  setEmptyData = () => {
    this.data = {
      @observable id: '',
      @observable title: '',
      @observable description: '',
      @observable link: '',

      @observable views: 0,
      @observable rating: 0,
      @observable order: null,

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
        @observable rooms: 1,
        @observable bathrooms: 1,
        @observable bedrooms: 1,
        @observable beds: 1,

        @observable squares: 10,
      },
      @observable floors: [1, 1],
      @observable price: [],
      @observable dewa: 0,
      @observable params: [],
      @observable images: {
        thumbnail: {},
        gallery: []
      },
    };
  }
  CreateNew = (userId) => {
    this.setEmptyData();

    this.getUser(userId);
  };
  @action Import = __object => {
    const object = __object.toJSON
      ? __object.toJSON() : __object;

    this.setEmptyData();
    if (isEmpty(object))
      return null;

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
    if (object.type) {
      const type = typeof object.type === 'string'
        ? objectTypes.types.find(item => item.id === object.type)
        : object.type
      this.data.type = type;
    }
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
      loc.subway && loc.subway.length && (this.data.location.subway.replace([...loc.subway]));
      loc.timing && loc.timing.length && (this.data.location.timing.replace([...loc.timing]));
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
    if (object._userData || object._creator || object.user) {
      this.getUser(object._userData || object._creator || object.user);
    }
    // object params
    if (object.params) {
      this.data.params.replace(
        this.parseParams(object.params)
      )
    }
    if (object.order != null) {
      this.data.order = object.order;
    }
  };
  @action Validate = () => {
    const errors = keys(this.data, (value, prop, result) => {
      const validation = isValid(prop, value) || {};
      let error = {};

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
  @action Send = cb => {
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

    if (data.user) {
      data._creator = (data.user._id || data.user.id || data.user);
    }

    if (data.type && data.type.id) {
      data.type = data.type.id;
    }
    if (data.category && data.category.id) {
      data.category = data.category.id;
    }
    if (data.status && data.status.id) {
      data.status = data.status.id;
    }

    data.images = {
      thumbnail: data.images[0],
      gallery: data.images.filter(it => !!it)
    };

    data.params = this.params;

    if (data.id || data._id) {
      return store.items.updateItem((data.id || data._id), data, cb);
    }

    store.items.createItem(data, cb);
  };

  getUser = data => {
    if (typeof data === 'string') {
      const query = it => (it.id || it._id) === data;
      const user = store.users.find(query);
      if (!user) {
        return store.users.fetchUsers(() => {
          const user = store.users.find(query);
          this.data.user = user;
        })
      }

      return this.data.user = user;
    }

    return this.data.user = store.user;
  }

  @computed get category() {
    const params = this.params;

    if (params.length < 13) {
      return {name: 'Добавьте больше параметров, чтобы мы могли определить категорию вашего объекта.'}
    }

    const category = ItemModel.testCategory(params);
    return category;
  }

  // helpers
  @computed get params() {
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
