import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BaseFilterSubway } from 'components'
import { subwaySpb } from 'constants'


const mapStateToProps = ({filter: {stations, replaceStations}}) => ({
  stations, replaceStations
});

@inject(mapStateToProps) @observer
export default class BaseFilterSubwayContainer extends Component {
  onChange = stations => {
    let data = [];

    stations.forEach(id => {
      const item = subwaySpb.find(id);
      if (item) {
        data.push(item)
      }
    });

    this.props.replaceStations(data)
  };

  render() {
    return <BaseFilterSubway data={this.props.stations}
                             onChange={this.onChange} />
  }
}

