import React, { Component } from 'react'
import { ItemParamsRow } from 'components'
import s from './ItemParams.sass'

export default class ItemParams extends Component {
  clearCategory = data => {
    data.forEach(item => item.isActive = false);

    return this.forceUpdate();
  };
  toggleActive = item => {
    if (this.props.edit)
      return this.props.onChange(item);

    item.isActive = !item.isActive;
  };

  titleClickHandler = e => {
    if (!this.props.readOnly) {
      this.clearCategory(e)
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
  itemClickHandler = e => {
    if (!this.props.readOnly) {
      this.toggleActive(e)
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };


  render() {
    const { data, readOnly, children, onChange } = this.props;

    return (
      <div className={s.wrapper}>
        {children}
        {data.map((item, key) => (
          <ItemParamsRow onItemClick={this.itemClickHandler}
                         onTitleClick={this.titleClickHandler}
                         onChange={onChange}
                         title={item.name} key={key} readOnly={readOnly}
                         data={item.types}/>
        ))}
      </div>
    )
  }
}

