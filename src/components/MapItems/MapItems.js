import React, { Component } from 'react'
import { Title, Content, Container } from 'components'
import { MapContainer } from 'containers'
import s from './MapItems.sass'


export default class MapItems extends Component {
  state = { data: [] };

  componentWillMount() {
    this.parseData();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.parseData(nextProps);
    }
  }
  parseData = (props = this.props) => {
    const { data } = props;
    console.log('parsing data..', data);

    this.setState({
      data: data.map(item => ({
        position: item.location.location,
        props: {
          data: item
        }
      }))
    })
  };

  mapOptions = {scrollwheel: false};

  render() {
    const { height } = this.props;
    const { data } = this.state;
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

