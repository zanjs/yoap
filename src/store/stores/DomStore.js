import { observable } from 'mobx'

class DomStore {
  @observable data = {};
  @observable params = {};

  /**
  * Update DomStore function.
  *
  * @param {string} name
  * @param {Object} block
  * @param {*} params
  *
  * @return {Object} block
  */
  update = ({name, block}, params) => {
    this.data[name] = block;

    if (params) {
      this.params[name] = params;
    }

    return block;
  }
}

export default new DomStore;
