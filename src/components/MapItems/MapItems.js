import React, { Component } from 'react'
import { Title, Content, Map, Container } from 'components'
import s from './MapItems.sass'


export default class MapItems extends Component {
  state = { data: [] };

  componentDidMount() {
    this.parseData();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.parseData(nextProps);
    }
  }
  parseData = (props = this.props) => {
    const { data } = props;

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
        <Map points={data} options={this.mapOptions}
             style={{height: `${height}px`}}/>
      </div>
    )
  }
}

