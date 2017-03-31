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

    this.setState({data, isFetching: false}, this.onChange);
  };

  componentWillReceiveProps(nextProps) {
    const { point } = nextProps;
    const _point = this.props.point;
    const { position } = point;
    const _position = _point.position;


    if (!_point && point) {
      return this.search(point)
    }

    if (!point || !position) {
      return this.setState({data: null})
    }

    if (position[0] !== _position[0] || position[1] !== _position[1]) {
      return this.search(point);
    }
  }

  search = point => {
    const { position } = point || this.props.point;

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

  onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.data);
    }
  };

  render() {
    const { data, isFetching } = this.state;
    const { isActive } = this;
    const Point = this.props.render;

    return (
      <div className={s.wrapper}>
        {data && data.length && data.map((item, key) => (
          <Point isActive={isActive(item.position)} key={key} {...item}/>
        )) || <Content gray size="4" light className={s.message}>
          {isFetching ? 'Загружаем данные...' : 'Ближайшие станции не найдены :('}
        </Content>}
      </div>
    )
  }
}

