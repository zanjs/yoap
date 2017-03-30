import React, { Component } from 'react'
import { Content } from 'components'
import { NearestTransport } from 'helpers'
import { subwaySpb } from 'constants'
import s from './NearestStations.sass'


export default class NearestStations extends Component {
  maxDistance = 3.5;


  state = {
    data: [],
    isFetching: false
  };

  constructor(props) {
    super(props);

    this.transport = new NearestTransport();
  }

  formatStations = stations => {
    let data = stations.map(item => {
      const block = subwaySpb.findByName(item.name);

      return {
        ...item,
        ...block
      }
    });

    this.setState({data, isFetching: false});
  };

  search = () => {
    const { position } = this.props.point;

    this.setState({isFetching: true});
    return this.transport.findStations(
      position, this.formatStations
    );
  };

  componentDidMount() {
    this.search();
  }

  isActive = pos => {
    if (!this.props.direction)
      return false;

    const { direction: {position} } = this.props;
    if (!position || !position.length)
      return false;

    const [lat, lng] = position;
    const _lat = pos[0];
    const _lng = pos[1];

    return _lat === lat && lng === _lng;
  };

  render() {
    const { data, isFetching } = this.state;
    const { isActive } = this;
    const Render = this.props.render;

    return (
      <div className={s.wrapper}>
        {data.length && data.map((item, key) => (
          <Render isActive={isActive(item.position)} key={key} {...item}/>
        )) || <Content gray size="4" light className={s.message}>
          {isFetching ? 'Загружаем данные...' : 'Ближайшие станции не найдены :('}
        </Content>}
      </div>
    )
  }
}

