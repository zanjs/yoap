import { observable } from 'mobx'

class ManageItemStore {
  @observable errors = {};

  @observable data = {
    @observable id: '',
    @observable title: '',
    @observable description: '',
    @observable link: '',

    @observable views: 0,
    @observable rating: 0,

    @observable category: '',
    @observable status: '',
    @observable user: {},

    @observable location: {
      address: '',
      location: [],
      timing: [],
      subway: []
    },
    @observable size: {},
    @observable floors: [],
    @observable price: [],
    @observable dewa: 0,
    @observable params: [],
    @observable images: {
      thumbnail: {},
      gallery: []
    },
  };

  Import = __object => {
    const object = __object.toJSON
      ? __object.toJSON() : __object;

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
    if (object.user || object._creator)
      this.data.user = object.user || object._creator;
    // object params
    if (object.params)
      this.data.params.replace([...object.params])
  };
}

export default new ManageItemStore;
