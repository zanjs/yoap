import React, { Component } from 'react'
import { Title, Content, FlexGrid, Link, Svg } from 'components'
import { classNames } from 'helpers'
import s from './ItemParamsRow.sass'

import arrowIcon from 'icons/ui/arrow-small.svg'

export default class ItemParamsRow extends Component {
  static itemClassName = s.item;
  static activeItemClassName = s.item_active;

  limit = 3; state = {isFull: false};

  toggleFullState = () => this.setState(({isFull}) => ({
    isFull: !isFull
  }), this.props.onChange);



  renderRows = (data, onItemClick, isFull, limit) => (
    <FlexGrid className={s.grid} justify="start" align="start" wrap="true">
      {data.map((item, key) => {
        const {isActive, name, id} = item;
        const _name = name.split('(');
        const content = _name[0]
        const tip = _name[1] ? `(${_name[1]}` : null;
        const onClick = () => {
          onItemClick(item);
          return this.forceUpdate();
        };
        if (!isFull && key > limit)
          return null;

        return (
          <Content onClick={onItemClick && onClick} title={tip}
                   className={classNames(s.item, isActive && s.item_active)}
                   size="2" light key={id || key}>
            {content}
          </Content>
        )
      })}
    </FlexGrid>
  );

  isActive = data => data.find(item => item.isActive);

  render() {
    const {
      limit, state: { isFull } ,
      props: { title, children, data, onItemClick, onTitleClick, readOnly }
    } = this;
    const isLimited = data && data.length > limit + 1;
    const isActive = data && this.isActive(data);

    return (
      <div className={s.wrapper}>
        <Title onClick={onTitleClick && (() => onTitleClick(data))} size="5" regular light
               className={classNames(s.title, isActive && s.title_clear)}>
          {isActive && !readOnly ? `${title} — Очистить` : title}
        </Title>
        {data && this.renderRows(data, onItemClick, isFull, limit)}
        {children && <FlexGrid className={s.grid} justify="start" align="start" wrap="true">
          {children}
        </FlexGrid>}
        {isLimited && <Link onClick={this.toggleFullState} className={s.link} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
          <Svg className={classNames(s.arrow, isFull && s.arrow_top)} src={arrowIcon}/>
        </Link>}
        <div className={s.line}/>
      </div>
    )
  }
}

