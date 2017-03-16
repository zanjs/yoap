import React, { Component } from 'react'
import { ProFilterItem } from 'components'
import s from './ProFilter.sass'

export default class ProFilter extends Component {
  clearCategory = data => {
    data.forEach(item => item.isActive = false);

    return this.forceUpdate();
  };
  toggleActive = item => {
    item.isActive = !item.isActive;
    return this.forceUpdate();
  };


  render() {
    const { data } = this.props

    return (
      <div className={s.wrapper}>
        {data.map((item, key) => (
          <ProFilterItem onItemClick={this.toggleActive}
                         onTitleClick={this.clearCategory}
                         title={item.name} key={key}
                         data={item.types}/>
        ))}
      </div>
    )
  }
}

