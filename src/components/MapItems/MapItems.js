import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Title, Content, Container } from 'components'
import { MapContainer } from 'containers'
import s from './MapItems.sass'


const mapStateToProps = ({items, device: {height}}) => ({
  height, items
});

@inject(mapStateToProps) @observer
export default class MapItems extends Component {
  state = { data: [] };

  parseData = data => {
    return data.map(item => {
      const { location } = item.location;
      const position = [location[0], location[1]];

      return {
        position,
        props: {
          data: item
        }
      }
    })
  };

  mapOptions = {scrollwheel: false};

  render() {
    const { height, items } = this.props;
    const data = this.parseData(items.data);

    return (
      <div className={s.wrapper}>
        <Container tag="header" className={s.header}>
          <Title size="2" light center nooffsets>
            Найдено {data.length} вариантов
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

