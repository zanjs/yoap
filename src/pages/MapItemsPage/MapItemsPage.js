import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  LoadingAnimation, Content, FlexGrid,
  Container, BaseFilter
} from 'components'
import { MapContainer, ProFilterContainer } from 'containers'
import { declination, parseItemsToPoints } from 'helpers'
import s from './MapItemsPage.sass'

const mapStateToProps = store => {
  const {
    items: {filtered, isFetching, data},
    filter: {hasSearched, find},
    device: {height, width}
  } = store

  return {
    height, find,
    data: (hasSearched ? filtered : data) || [],
    isFetching, hasSearched,
    isMobile: width <= 992
  }
};

@inject(mapStateToProps) @observer
export default class MapItemsPage extends Component {
  state = {data: [], isFull: false}

  mapOptions = (props = this.props) => ({
    scrollwheel: true,
    zoomControl: true,
    scaleControl: false,
    mapTypeControl: false,
    rotateControl: props.isMobile,
    streetViewControl: false,
    fullscreenControl: props.isMobile
  })

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

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }
  componentWillMount() {
    this.update();
  }

  update = (props = this.props) => {
    const { data } = props;

    this.setState({
      data: parseItemsToPoints(data) || []
    })
  }

  searchHandler = e => {
    e.preventDefault();

    this.props.find();

    return false;
  }

  toggleFull = () => this.setState(state => ({
    isFull: !state.isFull
  }))

  render() {
    const { height, hasSearched, isFetching, isMobile } = this.props;
    const { data, isFull } = this.state;
    const title = hasSearched ? 'На карте для вас' : 'На карте';
    const {
      searchHandler, toggleFull,
      foundWord, varWord
    } = this;
    const length = data.length;

    const BaseFilterMarkup = (
      <section className={s.base__wrapper}>
        <Container className={s.base__container}>
          <BaseFilter refresh={hasSearched}
                      onSearchClick={searchHandler}
                      noButtons className={s.base} />
        </Container>
      </section>
    );
    const MoreParamsButton = (
      <Content onClick={toggleFull} className={s.more} nooffsets size="2" gray>
        {isFull ? 'Меньше параметров' : 'Больше параметров'}
      </Content>
    );

    return (
      <div className={s.wrapper}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {isFetching && <LoadingAnimation />}
        <header className={s.header}>
          <Container>
            <FlexGrid className={s.buttons} justify="space-between" align="center">
              <Content nooffsets size="3">
                {hasSearched ?
                  `${foundWord(length)} ${length} ${varWord(length)}`
                  : 'Начните поиск по карте:'}
              </Content>
              {!isMobile && MoreParamsButton}
            </FlexGrid>
            {isMobile && BaseFilterMarkup}
            {isMobile && MoreParamsButton}
            {isFull && <ProFilterContainer onClose={toggleFull}/>}
          </Container>
        </header>
        <MapContainer wrapperClassName={s.map} points={data}
                      options={this.mapOptions()}
                      style={{height: `${height}px`}}>
          {!isMobile && BaseFilterMarkup}
        </MapContainer>
      </div>
    )
  }
}

