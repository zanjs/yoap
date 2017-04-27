import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { StatusChange } from 'components'
import { statusTypes } from 'constants'
import { splitter } from 'config'

const mapStateToProps = ({items: {updateItem}, manage: {data}, user: {isAdmin}}) => ({
  updateItem,
  id: data.id,
  value: data.status,
  isAdmin
})

@inject(mapStateToProps) @observer
export default class StatusChangeContainer extends Component {
  types = statusTypes.types;
  values = statusTypes.types.map(it => it.name);

  getData = name => this.types.find(
    it => it.name === name
  );
  changeHandler = ({target}) => {
    const name = target.value;
    const status = (this.getData(name) || {}).id;
    const { id } = this.props;

    if (!id || !status)
      return false;

    this.props.updateItem(id, {status}, () => {
      console.log('status was successfully changed!')
    });
  };
  getDefaultValue = val => {
    if (typeof val === 'string') {
      if (val.indexOf(splitter) !== -1) {
        const status = this.types.find(it => it.id === val);
        return status && status.name || val;
      } else {
        const status = this.getData(val);
        return status && status.name || val;
      }
    }

    if (val && val.name) {
      return val.name;
    }

    return val;
  };

  render() {
    const {
      values, changeHandler,
      getDefaultValue,
      props: { value, isAdmin }
    } = this;

    if (!isAdmin) {
      return <span>{getDefaultValue(value)}</span>
    }

    return <StatusChange value={getDefaultValue(value)}
                         onChange={changeHandler}
                         data={values} />
  }
}

