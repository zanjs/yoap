import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Title, Content, Container } from 'components'
import { MapContainer } from 'containers'
import { declination, parseItemsToPoints } from 'helpers'
import s from './MapItems.sass'


const mapStateToProps = ({items: {filtered, data}, filter: {hasSearched}, device: {height}}) => ({
  height,
  items: (hasSearched ? filtered : data) || [],
});

@inject(mapStateToProps) @observer
export default class MapItems extends Component {
  mapOptions = {scrollwheel: false};
  state = {data: []};

  foundWord = declination([
    'Найден',
    'Найдены',
    'Найдено'
  ]);
  varWord = declination([
    'вариант',
    'варианта',
    'вариантов'
  ])

  render() {
    const { height, items } = this.props;
    const { foundWord, varWord } = this;
    const data = items && parseItemsToPoints(items) || [];
    const length = data.length;

    return (
      <div className={s.wrapper}>
        <Container tag="header" className={s.header}>
          <Title size="2" light center nooffsets>
            {`${foundWord(length)} ${length} ${varWord(length)}`}
          </Title>
          <Content size="2" gray center className={s.subtitle}>
            Используйте приближение, чтобы увидеть больше
          </Content>
        </Container>
        <MapContainer points={data} options={this.mapOptions}
             style={{height: `${height * .9}px`}}/>
      </div>
    )
  }
}

