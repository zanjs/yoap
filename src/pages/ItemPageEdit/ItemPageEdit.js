import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  ItemPageInfoEdit,
  ItemPageInfoScroller,
  ItemPageEditPhoto,
  ButtonsAction,
  LoadingAnimation,
  Button
} from 'components'
import {
  ItemPageParametersContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, shallowEqual, isEmpty } from 'helpers'
import {
  stateType, furnitureType,
  facilityTypeCommon, facilityTypesCommon
} from 'constants'
import s from './ItemPageEdit.sass'

@inject(({filter, items, user}) => ({
  filter, user, items
})) @observer
export default class ItemPageEdit extends Component {
  isMount = false;
  state = {
    data: {},
    params: {},
    images: {},
    size: {},
    location: {},
    saved: false
  };

  getData = () => {
    const { link } = this.props.match.params;

    if (link !== 'create' && link !== 'add' && link !== 'new') {
      this.props.items.findByLink(link, 'users', data => {
        this.insertData(data);
      });

      return true;
    }

    return false;
  };

  insertData = data => {
    let newData = {};

    newData.size = {
      ...data.size,
      floors: data.floors.length ? data.floors : [0, 0]
    };
    newData.location = data.location;
    newData.images = data.images;
    newData.params = this.parseParams(data.types);
    newData.data = data;

    console.log(newData);

    this.setState(newData);
  };

  // set active parameters of object
  parseParams = params => {
    let types = this.props.filter.cleanTypes;

    return types.map(item => ({
      ...item,
      types: item.types.filter(_item => !!_item && !!_item.id).map(type => {
        const res = params.find(param => param && param.id === type.id);
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

  // filter clean parameters
  generateParams = data => {
    const type = facilityTypeCommon;
    const { types } = facilityTypesCommon;
    const except = types[types.length - 1].id;
    const match = (str, str1) => str.indexOf(str1) !== -1;

    return data.map(param => {
      if (match(type, param.id)) {
        return {
          ...param,
          types: param.types.map(item => {
            if (
              match(item.id, type)
              && item.id !== except
            ) {
              return {
                ...item,
                isActive: true
              };
            }

            return item;
          })
        }
      }

      return param;
    })
  };

  // entry point of initialize page
  // if this page exist at db -> insert that data
  // if not -> generate clean params
  componentWillMount() {
    const isExist = this.getData();

    if (isExist) {
      return;
    }

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
        params: this.generateParams(filter.cleanTypes)
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
  componentDidMount() {
    this.isMount = true;
    setTimeout(() => this.isMount && this.forceUpdate(), 2000);
  }
  componentWillUnmount() {
    this.isMount = false;
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

  photosChangeHandler = images => {
    this.setState({images})
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
    const {
      data, params, size,
      location, images
    } = this.state;
    const { user } = this.props;

    let _data = {
      ...data,
      size,
      location
    };
    let _params = [];

    // get all active parameters
    params.forEach(item => {
      item.types.forEach(block => {
        if (block.isActive) {
          _params.push(block.id);
        }
      })
    });

    // type
    if (typeof _data.type !== 'string') {
      _data.type = _data._type;
    }

    _data.params = [..._params, _data.type];
    _data.user = user;

    // floors
    _data.floors = _data.size.floors;
    delete _data.size.floors;

    if (images) {
      _data.images = {
        thumbnail: images[0],
        gallery: images
      }
    }

    console.log(window.data = _data);

    this.props.items.createItem(_data, props => {
      this.setState({
        saved: true
      })
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;

    if (state.saved !== nextState.saved) {
      return true;
    }

    if (props.items.isFetching !== nextProps.items.isFetching) {
      return true;
    }

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
      state: {shouldUpdate, size, params, data, images, saved, location},
      props: {items: {isFetching}, user},
      paramsChangeHandler,
      infoChangeHandler,
      locationChangeHandler,
      sizeChangeHandler,
      submitHandler,
      photosChangeHandler
    } = this;

    if (saved) {
      return <Redirect to={user.isAdmin ? '/manage' : "/you"}/>
    }

    if (isEmpty(params)) {
      return <div className={s.empty}>
        <LoadingAnimation />
      </div>
    }

    return (
      <div style={{opacity: isFetching ? .5 : 1}}>
        <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
          <ItemPageEditPhoto data={images} onChange={photosChangeHandler} />
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
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

