/**
 * Model for an Item
 *
 * todo: ItemModel description.
 *
 */

import { observable, computed } from 'mobx'
import { extend } from 'helpers'
import { splitter } from 'config'
import {
  objectType, objectTypes,
  facilityType, facilitiesTypes,
  amenityType, amenitiesTypes,
  rulesType, rulesTypes,
  termType, termTypes,
  categoryType, categoryTypes,

  furnitureType, furnitureTypes,
  stateType, stateTypes,
  statusTypes
} from 'constants'


export default class ItemModel {
  store;
  @observable _id;

  @computed get id() {
    return this._id;
  }
  set id(v) {
    this._id = v;
  }

  @observable featured = 0;

  /**
   * Generate a title for an Item.
   *
   * @param type, size, floors
   * @returns {string} '2-к квартира, 56м2, 9/10 эт.'
   */
  _title;
  @computed get title() {
    if (this._title) return this._title;

    if (!this.type || !this.size || !this.floors) return;

    const type = this.type.id === objectTypes.types[2].id ? // if type studio
      `${this.type.name}` : `${this.size.rooms}-к ${this.type.name.toLowerCase()}`;
    const size = `${this.size.squares.total}м2`;
    const floors = `${this.floors[0]}${this.floors[1] ? `/${this.floors[1]}` : ''} эт.`;

    return `${type}, ${size}, ${floors}`
  }
  set title(title) {
    this._title = title;
  }

  /**
   * Generate a link to an Item.
   *
   * @returns {string} '/y/some-title'
   */
  _link;
  @computed get link() {
    return `/y/${this._link}`;
  }
  /**
   * Parse a status.
   *
   * @returns {string} '/y/some-title'
   */
  @observable status;
  @computed get statusName() {
    const status = statusTypes.types
      .find(item => item.id === this.status);
    if (status) {
      return status.name;
    }

    return null;
  }

  /**
   * Parse category id.
   *
   * @param categoryTypes, _category
   * @returns {object} {id, name}
   */
  @observable _category;
  @computed get category() {
    if (this._category) {
      const { id, name } =
        categoryTypes.find(item => item.id === this._category);

      return {id, name}
    }

    // test category if it's not defined
    const category = ItemModel.testCategory(this.types);
    this._category = category.id;

    return {id: category.id, name: category.name};
  }
  set category(id) {
    this._category = id;
  }
  /**
   * Parse object type.
   *
   * @param objectTypes, _type
   * @returns {object} {id, name}
   */
  _type;
  @computed get type() {
    return objectTypes.types.find(item => item.id === this._type);
  }

  /**
   * Parse object state.
   *
   * @param objectTypes, _type
   * @returns {object} {id, name}
   */
  _state;
  @computed get state() {
    return stateTypes.types.find(item => item.id === this._state);
  }

  /**
   * Parse object furniture.
   *
   * @param objectTypes, _type
   * @returns {object} {id, name}
   */
  _furniture;
  @computed get furniture() {
    return furnitureTypes.types.find(item => item.id === this._furniture);
  }

  /**
   * Floors array.
   *
   * @returns {Array} [floor, amount of floors]
   */
  floors;
  /**
   * Object size.
   * Contains amount of rooms and squares;
   *
   * @returns {object} {
        rooms: {number},
        bedrooms: {number},
        bathrooms: {number},

        squares: {
          living: {number},
          total: {number}
        }
      }
   */
  size;
  /**
   * Object location.
   * Contains object address, point on map, near metro stations
   * & timings to get a center of a city and nearest metro station.
   *
   * @returns {object} {
        address: {
          name: {string},
          point: [latitude, longitude]
        },
        subway: [ // the array of nearest metro stations.
          {
            name: {string},
            distance: {number} // distance of the station in km.
          }
        ],
        timing: {
          center: {number}, // amount of time to get a center of a city on minutes.
          subway: {number} // also to nearest subway
        }
      }
   */
  location;

  order;
  /**
   * Parse facilities to pretty view.
   * Contains names and ids of values;
   *
   * @returns {Array}
   */
  _facilities = [];
  @computed get facilities() {
    let _facilities = this._facilities.toString();
    return facilitiesTypes.map(({id, name, types}, index) => ({
      id, name,
      types: types.filter(type => _facilities.indexOf(type.id) !== -1)
    }))
  }
  /**
   * Parse amenities to pretty view.
   * Contains names and ids of values;
   *
   * @returns {Array}
   */
  _amenities = [];
  @computed get amenities() {
    const { id, name, types } = amenitiesTypes;
    return {
      id, name,

      types: types.filter(item => this._amenities.indexOf(item.id) !== -1)
    }
  }
  /**
   * Parse rules to pretty view.
   *
   * @returns {object} {id, name}
   */
  _rules = [];
  @computed get rules() {
    const { id, name, types } = rulesTypes;
    return {
      id, name,

      types: types.filter(item => this._rules.indexOf(item.id) !== -1)
    }
  }
  /**
   * Parse term type to pretty view.
   *
   * @returns {object} {id, name}
   */
  _term;
  @computed get term() {
    return termTypes.types.filter(item => item.id === this._term)[0];
  }
  /**
   * Serialize object params to pretty view.
   *
   * @returns {Array}
   */
  @computed get params() {
    const state = {
      ...stateTypes,
      types: [this.state]
    };
    const furniture = {
      ...furnitureTypes,
      types: [this.furniture]
    };

    return [
      state,
      this.facilities,
      furniture,
      this.amenities,
      this.rules
    ]
  }

  /**
   * Serialize object params types.
   *
   * @returns {Array}
   */
  @computed get types() {
    const { furniture, state, facilities, amenities, rules } = this;
    let types = [];

    // get state
    types = [
      state
    ];

    // get facilities types
    facilities.forEach(item => {
      if (item.types.length > 0) {
        types = [
          ...types,
          ...item.types
        ]
      }
    });

    // get furniture
    types = [
      furniture,
      ...types,
    ];

    // get amenities types
    if (amenities.types.length > 0) {
      types = [
        ...types,
        ...amenities.types
      ]
    }
    // get rules types
    if (rules.types.length > 0) {
      types = [
        ...types,
        ...rules.types
      ]
    }

    //console.log({ facilities, amenities, rules });

    return types;
  };

  /**
   * Object with pictures.
   * Contains image for preview & gallery with compressed versions
   * of images around 1kb.
   *
   * @returns {object} {
     thumbnail: {
        preview: {string}, // 1kb preview image version
        full: {string}
      },
      gallery: [ // array of images objects with full & preview version
        {
          preview: {string},
          full: {string}
        }
      ]
     }
   */
  images;
  /**
   * Object description.
   *
   * @returns {string}
   */
  description;

  /**
   * Object price.
   *
   * @returns {object} {
        deposit: {number},
        utilities: {number},
        amount: {number}
      }
   */
  price;
  dewa;

  /**
   * The landlord info.
   *
   * @return {object} {id, name}
   */
  @observable user;
  /**
   * Views count of the object.
   *
   * @returns {number}
   */
  views;

  /**
   * Pretty data of an object.
   * todo: returns object
   *
   * @returns {object}
   */
  @computed get prettyData() {
    const {
      id,
      title,
      category,
      price,

      size,
      location,

      images,
      description,

      user,
      views,

      type,
      state,
      furniture,
      term,
      params
    } = this;

    return {
      id,
      title,
      category,
      price,
      size,
      location,
      images,
      description,
      user,
      views,
      type,
      state,
      furniture,
      term,
      params
    }
  }

  /**
   * Get preview data (for tile) of object.
   * todo: returns object
   *
   * @returns {object}
   */
  @computed get previewData() {
    const {
      id, title, state, furniture,
      category, price,
      location,
      images, size, views
    } = this;

    return {
      id, title, state, furniture,
      category, price,
      location,
      images, size, views
    }
  }

  constructor(store, data) {
    this.store = store;

    //console.log(data);

    extend(this, data);
  }
  destroy = () => {
    this.store.remove(this);
  };

  /**
   * Generate JSON.
   * todo: returns object.
   *
   * @returns {object}
   */
  toJSON() {
    const {
      id, title, _link, _category,
      _state, _furniture, status,

      _type, dewa,
      size, location,
      floors, rating,
      order,

      _facilities, _amenities,
      _rules,

      images, description,
      price,

      user = {},
      _creator,
      views
    } = this;

    const category = _category || this.category.id;
    const type = _type && _type.id ? _type.id : _type;

    return {
      id,
      title,
      link: _link,
      type,
      category,
      status,
      order,

      price,
      dewa,

      params: [
        category,
        type,
        _state,
        _furniture,
        ..._amenities,
        ..._facilities,
        ..._rules,
      ],

      size,
      floors,
      location: this.parseLocation(location),

      images,
      description,

      _creator: (() => {
        let id;
        if (user) {
          if (typeof user === 'string') {
            id = user;
          }
          if (typeof user.id === 'string' || typeof user._id === 'string') {
            id = user.id || user._id;
          }
        }
        if (_creator) {
          if (typeof _creator === 'string') {
            id = _creator;
          }
          if (typeof _creator.id === 'string' || typeof _creator._id === 'string') {
            id = _creator.id || _creator._id;
          }
        }

        return id;
      })(),
      _userData: _creator,

      views,
      rating: rating || 0
    };
  }

  parseLocation = location => {
    return {
      ...location,
      subway: location.subway && location.subway.map(
        ({distance, duration, name, position, id}) =>
          ({distance, duration, name, position, id})
      )
    }
  };

  /**
   * Parse JSON to the model.
   * todo: params & rename to JSON
   *
   * @param {Array} store Model collections.
   * @param {Array} object JSON data to parse.
   */
  static fromJS(store, object) {
    const {
      params,
      link,
      type,
      category,

      ...rest
    } = object;
    let data = {
      ...rest,
      _id: rest.id || rest._id,

      _link: link,
      _type: '',
      _state: '',
      _furniture: '',
      _term: '',
      _amenities: [],
      _facilities: [],
      _rules: [],
    };

    // parse params
    params.forEach(item => {
      const type = item && item.split
        && `${item.split(splitter)[0]}`;
      /*
       * objectType, objectTypes,
       * facilityType, facilitiesTypes,
       * amenityType, amenitiesTypes,
       * rulesType, rulesTypes,
       * termType, termTypes
       * categoryType, categoryTypes
       */
      switch (type) {
        case objectType:
          return data._type = item.id ? item.id : item;
        case termType:
          return data._term = item;
        case facilityType:
          return data._facilities.push(item);
        case amenityType:
          return data._amenities.push(item);
        case rulesType:
          return data._rules.push(item);
        case stateType:
          return data._state = item;
        case furnitureType:
          return data._furniture = item;
        case categoryType:
          return data._category = item;
      }
    });

    if (!data._type) {
      data._type = type;
    }
    if (!data._category) {
      data._category = category;
    }


    return new ItemModel(store, data);
  }

  /**
   * Filter exceptions of parameters.
   *
   * @param {Array} params Array of object parameters.
   * @return {boolean}
   */
  static filterParams = params => params.filter(param => {
    const test = testing => testing.indexOf(param) !== -1;
    // the exceptions
    return !(
      test(objectType)   ||
      test(rulesType)    ||
      test(termType)     ||
      test(stateType)     ||
      test(furnitureType)     ||
      test(categoryType)
    );
  });

  /**
   * Match object parameters to other parameters.
   *
   * @param {Array} params Array with object parameters.
   * @param {Array} data Array with another parameters.
   * @param {string} _formattedParams Stringified array with parameters;
   *
   * @return {Array} Matched values
   */
  static match = (params, data, _formattedParams) => {
    let result = [];
    let formattedParams = _formattedParams || JSON.stringify(params);

    data.forEach(param => {
      if (formattedParams.indexOf(param.id) !== -1) {
        result.push(param);
      }
    });

    return result;
  };

  /**
   * Test object parameters on required & additional category parameters.
   *
   * @param {Array} params Array of object parameters.
   * @param {Array} required Array of parameters that should be matched.
   * @param {Array} additional Array of parameters that can be matched.
   * @param {Array} result Previous result.
   * @param {string} formattedParams Stringified array of parameters.
   *
   * @return {boolean} Matched values
   */
  static test = (params, {required, additional}, result, formattedParams) => {
    // if we have no
    if (required == null) {
      return !result;
    }

    // test required params
    const requiredTest = ItemModel.match(params, required, formattedParams);
    if (requiredTest.length !== required.length) return false;

    // test additional parameters
    const additionalParams = params.filter(param => {
      let result = true;

      requiredTest.forEach(item => {
        if (item.id === param) result = false;
      });

      return result;
    });

    // we should be sure that additional parameters
    // of the object does not exceed a limit of current category
    const additionalTest = ItemModel.match(additionalParams, additional, formattedParams);
    return additionalTest.length <= additional.length;
  };

  /**
   * Match object parameters to other parameters.
   *
   * @param {Array} params Array of object parameters.
   * @return {object} Matched object category.
   */
  static testCategory = (params) => {
    if (!params)
      return null;

    let result;
    const data = ItemModel.filterParams(params);
    const formattedParams = JSON.stringify(params);

    categoryTypes.forEach(item => {
      const value = ItemModel.test(data, item.types, result, formattedParams);

      if (value) {
        result = item;
      }
    });

    return result;
  };

}
