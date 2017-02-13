import { observable } from 'mobx'

class DomStore {
  @observable data = {};
  @observable params = {};

  update = ({name, block}, params) => {
    this.data[name] = block;

    if (params) {
      this.params[name] = params;
    }

    return block;
  }
}

export default new DomStore;
