import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  Container, FlexGrid, Title, LinkIcon,
  LoadingAnimation,
} from 'components'
import { FilterContainer, TilesGridContainer } from 'containers'
import s from './ItemsListPage.sass'

const mapStateToProps = ({items: {isFetching, fetchItems, filtered, data}, filter: {hasSearched}}) => ({
  isFetching, update: fetchItems,
  data: hasSearched ? filtered : data,
  hasSearched
});

@inject(mapStateToProps) @observer
export default class ItemsListPage extends Component {
  componentWillMount() {
    if (!this.props.isFetching)
      this.props.update();
  }

  render() {
    const { isFetching, hasSearched, data } = this.props;
    const title = hasSearched ? 'Подобранные для вас' : 'Все объявления';
    return (
      <div className={s.wrapper}>
        <Helmet title={title}/>
        {isFetching && <LoadingAnimation />}
        <Container>
          <FlexGrid className={s.title} justify="space-between" align="center">
            <Title nooffsets size="1">{title}</Title>
            <LinkIcon className={s.link} to="/m" gray>Посмотреть на карте</LinkIcon>
          </FlexGrid>
          <FilterContainer/>
          <TilesGridContainer data={data} />
        </Container>
      </div>
    )
  }
}

