import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemPageParameters, Container } from 'components'
import { isEmpty } from 'helpers'
import { stateType, furnitureType } from 'constants'

const mapStateToProps = ({filter, manage: { data, changeData }}) => ({
  filter,
  data: data.params,
  size: data.size,
  floors: data.floors,
  changeData
});

@inject(mapStateToProps) @observer
export default class ItemParametersEdit extends Component {
  getRef = b => this.wrapper = b;

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

    this.props.changeData({
      params: this.parseChangedParams(
        this.props.data,
        id, onlyOne
      )
    });
  };
  sizeChangeHandler = props => {
    let size = {
      ...this.props.size,
      ...props
    };

    const floors = [...(size.floors || this.props.floors)];
    delete size.floors;

    this.props.changeData({
      size, floors
    });
  };

  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.changeData({
        params: this.props.filter.cleanTypes
      })
    }
  }

  render() {
    const {
      props: {data, size, floors},
      paramsChangeHandler,
      sizeChangeHandler,
      getRef
    } = this;

    const _size = {
      ...size,
      floors
    };

    return (
      <Container getRef={getRef}>
        {!!data && !!data.length &&
        <ItemPageParameters edit data={data} size={_size}
                            onChange={paramsChangeHandler}
                            onSizeChange={sizeChangeHandler}/>}
      </Container>
    )
  }
}

