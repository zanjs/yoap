import React, { Component } from 'react'
import { Title, Content, FlexGrid, Link, Svg } from 'components'
import { classNames } from 'helpers'
import s from './ProFilterItem.sass'

import arrowIcon from 'icons/ui/arrow-small.svg'

export default class ProFilterItem extends Component {
  limit = 3; state = {isFull: false};

  toggleFullState = () => this.setState(({isFull}) => ({
    isFull: !isFull
  }))

  renderRows = (data, onItemClick, isFull, limit) => (
    <FlexGrid className={s.grid} justify="start" align="start" wrap="true">
      {data.map((item, key) => {
        const {isActive, name, id} = item;
        const _name = name.split('(');
        const content = _name[0]
        const tip = _name[1] ? `(${_name[1]}` : null;
        if (!isFull && key > limit)
          return null;

        return (
          <Content onClick={() => onItemClick(item)} title={tip}
                   className={classNames(s.item, isActive && s.item_active)}
                   size="2" light  key={id || key}>
            {content}
          </Content>
        )
      })}
    </FlexGrid>
  )

  isActive = data => data.find(item => item.isActive);

  render() {
    const {
      limit, state: { isFull } ,
      props: { title, children, data, onItemClick, onTitleClick }
    } = this;
    const isLimited = data.length > limit + 1;
    const isActive = this.isActive(data);

    return (
      <div className={s.wrapper}>
        <Title onClick={() => onTitleClick(data)} size="5" regular light
               className={classNames(s.title, isActive && s.title_clear)}>
          {isActive ? `${title} — Очистить` : title}
        </Title>
        {data && this.renderRows(data, onItemClick, isFull, limit)}
        {isLimited && <Link onClick={this.toggleFullState} className={s.link} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
          <Svg className={classNames(s.arrow, isFull && s.arrow_top)} src={arrowIcon}/>
        </Link>}
        {children}
        <div className={s.line}/>
      </div>
    )
  }
}

