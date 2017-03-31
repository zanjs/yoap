import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageInfoEdit,
  ItemPageInfoScroller,
  ItemPageEditPhoto
} from 'components'
import {
  ItemPageParametersContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, shallowEqual } from 'helpers'
import { stateType, furnitureType } from 'constants'
import s from './ItemPageEdit.sass'

@inject(({filter}) => ({
  filter
})) @observer
export default class ItemPageEdit extends Component {
  state = {
    data: {},
    params: {},
    size: {}
  };

  componentWillMount() {
    let result = {};
    const { size, params, data, filter } = this.props;

    if (size) {
      result = {
        size
      };
    } else {
      const { size, ...rest } = filter.cleanSize;
      result = {
        size: {
          ...size,
          ...rest
        }
      };
    }

    if (params) {
      result = {
        ...result,
        params
      };
    } else {
      result = {
        ...result,
        params: filter.cleanTypes
      };
    }

    if (data) {
      result = {
        ...result,
        data
      };
    } else {
      result = {
        ...result,
        data: {}
      };
    }

    this.setState(result);
  }

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  infoChangeHandler = props => {
    const { type } = props;
    this.setState(({data}) => ({
      data: {
        ...data,
        ...props,
        type: type && type.id || data.type
      }
    }))
  };

  locationChangeHandler = props => {
    this.setState(({data}) => ({data: {
      ...data,
      ...props
    }}), this.onChange);
  };

  sizeChangeHandler = props => {
    this.setState(({size}) => ({size: {
      ...size,
      ...props
    }}))
  };

  parseChangedParams = (params, id, onlyOne) => {
    const data = params.map(type => {
      if (id.indexOf(type.id) === -1)
        return type;

      if (onlyOne) {
        return {
          ...type,
          types: type.types.map(block => ({
            ...block,
            isActive: block.id === id
          }))
        }
      }

      return {
        ...type,
        types: type.types.map(block => {
          const isActive = block.id === id
            ? !block.isActive
            : !!block.isActive;

          return {
            ...block,
            isActive: isActive
          }
        })
      }
    });

    return data;
  };
  paramsChangeHandler = item => {
    if (!item || !item.id)
      return;

    const { id } = item;

    const onlyOne =
      id.indexOf(stateType) !== -1
      || id.indexOf(furnitureType) !== -1;

    this.setState({
      params: this.parseChangedParams(
        this.state.params,
        id, onlyOne
      )
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { state } = this;

    if (state.shouldUpdate !== nextState.shouldUpdate) {
      return true;
    }

    if (state.data.type !== nextState.data.type) {
      return true;
    }

    if (state.params !== nextState.params) {
      return true;
    }

    if (!shallowEqual(state.size, nextState.size)) {
      return true;
    }

    return !shallowEqual(state.params, nextState.params);
  }

  render() {
    const {
      state: {shouldUpdate, size, params},
      paramsChangeHandler,
      infoChangeHandler,
      locationChangeHandler,
      sizeChangeHandler
    } = this;

    return (
      <div>
        <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
          <ItemPageEditPhoto />
        )}>
          <ItemPageInfoEdit data={this.state.data} onChange={infoChangeHandler}
                            className={s.info} />
        </ItemPageInfoScroller>

        <ItemPageLocationContainer edit onChange={locationChangeHandler}
                                   shouldUpdate={shouldUpdate}/>

        <ItemPageParametersContainer onChange={paramsChangeHandler}
                                     onSizeChange={sizeChangeHandler}
                                     edit size={size}
                                     data={params} />
      </div>
    )
  }
}

