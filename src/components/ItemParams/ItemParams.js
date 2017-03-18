import React, { Component } from 'react'
import { ItemParamsRow } from 'components'
import s from './ItemParams.sass'

export default class ItemParams extends Component {
  clearCategory = data => {
    data.forEach(item => item.isActive = false);

    return this.forceUpdate();
  };
  toggleActive = item => {
    item.isActive = !item.isActive;
    return this.forceUpdate();
  };


  render() {
    const { data, readOnly, children } = this.props

    return (
      <div className={s.wrapper}>
        {children}
        {data.map((item, key) => (
          <ItemParamsRow onItemClick={!readOnly && this.toggleActive}
                         onTitleClick={!readOnly && this.clearCategory}
                         title={item.name} key={key}
                         data={item.types}/>
        ))}
      </div>
    )
  }
}

