import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageInfoEdit,
  ItemPageInfoScroller,
  ItemPageEditPhoto,
  ButtonsAction,
  Button
} from 'components'
import {
  ItemPageParametersContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, shallowEqual } from 'helpers'
import { stateType, furnitureType } from 'constants'
import s from './ItemPageEdit.sass'

@inject(({filter, items, user}) => ({
  filter, user, items
})) @observer
export default class ItemPageEdit extends Component {
  state = {
    data: {},
    params: {},
    size: {},
    location: {},
    buttons: null
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
    console.log(this.props);
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
    this.setState(({location}) => ({location: {
      ...location,
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

  submitHandler = () => {
    const { data, params, size, location } = this.state;
    const { user } = this.props;

    let _data = {
      ...data,
      size,
      location
    };
    let _params = [];

    params.forEach(item => {
      item.types.forEach(block => {
        if (block.isActive) {
          _params.push(block.id);
        }
      })
    });

    _data.params = _params;
    _data.user = user;

    this.props.items.createItem(_data, props => {
      console.log('saved!!!', props);
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

    if (!shallowEqual(state.params, nextState.params)) {
      return true
    }

    if (!shallowEqual(state.location, nextState.location)) {
      return true
    }

    return state.buttons !== nextState.buttons;
  }

  render() {
    const {
      state: {shouldUpdate, size, params, data, location},
      props: {items: {isFetching}, user},
      paramsChangeHandler,
      infoChangeHandler,
      locationChangeHandler,
      sizeChangeHandler,
      submitHandler
    } = this;

    return (
      <div style={{opacity: isFetching ? .5 : 1}}>
        <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
          <ItemPageEditPhoto />
        )}>
          <ItemPageInfoEdit data={data} user={user} onChange={infoChangeHandler}
                            className={s.info} />
        </ItemPageInfoScroller>

        <ItemPageLocationContainer edit onChange={locationChangeHandler}
                                   data={location}
                                   shouldUpdate={shouldUpdate}/>

        <ItemPageParametersContainer onChange={paramsChangeHandler}
                                     onSizeChange={sizeChangeHandler}
                                     edit size={size}
                                     data={params} />
        <ButtonsAction withContainer>
          <Button type="text">Отменить</Button>
          <Button onClick={submitHandler} type="green">Готово</Button>
        </ButtonsAction>
      </div>
    )
  }
}

