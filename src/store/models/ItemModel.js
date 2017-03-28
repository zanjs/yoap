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
  categoryType, categoryTypes
} from 'constants'


export default class ItemModel {
  store;
  id;

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
  @observable _link;
  @computed get link() {
    return `/y/${this._link}`;
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
        categoryTypes.filter(item => item.id === this._category)[0];

      return {id, name}
    }

    return this.testCategory(
      this.toJSON().params
    );
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
  @observable _type;
  @computed get type() {
    return objectTypes.types.find(item => item.id === this._type);
  }

  /**
   * Floors array.
   *
   * @returns {Array} [floor, amount of floors]
   */
  @observable floors;
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
  @observable size;
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
  @observable location;

  /**
   * Parse facilities to pretty view.
   * Contains names and ids of values;
   *
   * @returns {Array}
   */
  @observable _facilities = [];
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
  @observable _amenities = [];
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
  @observable _rules = [];
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
  @observable _term;
  @computed get term() {
    return termTypes.types.filter(item => item.id === this._term)[0];
  }
  /**
   * Serialize object params to pretty view.
   *
   * @returns {Array}
   */
  @computed get params() {
    return [
      this.facilities,
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
    const { facilities, amenities, rules } = this;
    let types = [];

    // get facilities types
    facilities.forEach(item => {
      if (item.types.length > 0) {
        types = [
          ...types,
          ...item.types
        ]
      }
    });
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
  @observable images;
  /**
   * Object description.
   *
   * @returns {string}
   */
  @observable description;

  /**
   * Object price.
   *
   * @returns {object} {
        deposit: {number},
        utilities: {number},
        amount: {number}
      }
   */
  @observable price;

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
  @observable views;


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
      id, title,
      category, price,
      location,
      images, size, views
    } = this;

    return {
      id, title,
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

      _type,
      size, location,

      _facilities, _amenities,
      _rules,

      images, description,

      _term, price,

      user,
      views
    } = this;

    return {
      id,
      title,
      link: _link,

      price,

      params: [
        _category,
        _type,
        _term,
        ..._amenities,
        ..._facilities,
        ..._rules,
      ],

      size,
      location,

      images,
      description,

      user,
      views
    };
  }

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
      ...rest
    } = object;
    let data = {
      ...rest,

      _link: link,
      _type: '',
      _term: '',
      _amenities: [],
      _facilities: [],
      _rules: [],
    };

    // parse params
    params.forEach(item => {
      const type = `${item.split(splitter)[0]}`;
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
          return data._type = item;
        case termType:
          return data._term = item;
        case facilityType:
          return data._facilities.push(item);
        case amenityType:
          return data._amenities.push(item);
        case rulesType:
          return data._rules.push(item);
        case categoryType:
          return data._category = item;
      }
    });


    return new ItemModel(store, data);
  }

  /**
   * Filter exceptions of parameters.
   *
   * @param {Array} params Array of object parameters.
   * @return {boolean}
   */
  _filterParams = params => params.filter(param => {
    const test = testing => testing.indexOf(param) !== -1;
    // the exceptions
    return !(
      test(objectType)   ||
      test(rulesType)    ||
      test(termType)     ||
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
  _match = (params, data, _formattedParams) => {
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
  _test = (params, {required, additional}, result, formattedParams) => {
    // if we have no
    if (required == null) {
      return !result;
    }

    // test required params
    const requiredTest = this._match(params, required, formattedParams);
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
    const additionalTest = this._match(additionalParams, additional, formattedParams);
    return additionalTest.length <= additional.length;
  };

  /**
   * Match object parameters to other parameters.
   *
   * @param {Array} params Array of object parameters.
   * @return {object} Matched object category.
   */
  testCategory = window.testCategory = params => {
    console.time('testCategory');
    let result;
    const data = this._filterParams(params);
    const formattedParams = JSON.stringify(params);

    categoryTypes.forEach(item => {
      const value = this._test(data, item.types, result, formattedParams);

      if (value) {
        result = item;
      }
    });

    console.timeEnd('testCategory');
    return result;
  };

}

// just for debug, todo: remove types debug
window.types = {
  objectTypes,
  facilitiesTypes,
  amenitiesTypes,
  rulesTypes,
  termTypes,
  categoryTypes
};
