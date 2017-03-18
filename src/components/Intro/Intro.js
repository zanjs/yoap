import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Title, FlexGrid, Container, Content } from 'components'
import { BaseFilterContainer, ProFilterContainer } from 'containers'
import s from './Intro.sass'

const mapStateToProps = ({
  device: {
    height, width, navHeight
  }
}) => ({
  height: `${height}px`,
  width: `${width}px`,
  offset: `${navHeight}px`,
  isMobile: width <= 992
});

@inject(mapStateToProps) @observer
export default class Intro extends Component {
  state = {isFilterFull: false};
  toggleFull = () => this.setState(({isFilterFull}) => ({
    isFilterFull: !isFilterFull
  }))

  render() {
    const { isFilterFull } = this.state;
    const { height, offset, isMobile } = this.props;

    return (
      <div>
        <FlexGrid style={{minHeight: height}} direction="column"
                  justify="end" className={s.intro}>
          <Container style={{paddingTop: offset}}>
            <Title size="1">
              {isMobile ? 'Поиск квартир. Проверено.' : <span>
                  Чувствуйте себя как дома. <br/>
                  Поиск квартир. Проверенные <br/>
                  объявления от собственников. <br/>
                </span>}
            </Title>
            <div className={s.line} />
            <Content className={s.subtitle} regular light>
              Начните поиск по ключевым параметрам:
            </Content>

            <BaseFilterContainer isFull={isFilterFull}
                                 onMoreButtonClick={this.toggleFull} />
          </Container>
        </FlexGrid>
        {isFilterFull && <Container><ProFilterContainer /></Container>}
      </div>
    )
  }
}

