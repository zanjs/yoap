import React, { Component } from 'react'
import { Title, Content, Map } from 'components'
import s from './MapItems.sass'


export default class MapItems extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <header className={s.header}>
          <Title size="2" light>
            Найдено {data.length} вариантов
          </Title>
          <Content size="2" gray>
            Используйте приближение, чтобы увидеть больше
          </Content>
        </header>
        <Map />
      </div>
    )
  }
}

