import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Title, Container, Content,
  ItemTilesGrid, FlexGrid, LinkIcon
} from 'components'
import s from './ItemTilesBanner.sass'
import { devicesBreakpoints } from 'config'


const mapStateToProps = ({device: {width}, items: {data}}) => ({
  data, isMobile: width <= devicesBreakpoints.mobile
});
@inject(mapStateToProps) @observer
export default class ItemTilesBanner extends Component {
  componentDidMount() {
    setTimeout(this.resize, 300);
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  componentDidUpdate() {
    this.resize();
  }
  update = () => {
    this.forceUpdate();
  };

  resize = () => setTimeout(this.resizeHandler, 60);
  resizeHandler = () => {
    if (this.props.isMobile)
      return;

    const gridHeight = this.setGridWrapperHeight();
    this.setGridWidth();
    this.setContentHeight(gridHeight);
  };

  setGridWrapperHeight = () => {
    if (!this.grid) return;
    const height = parseInt(this.grid.clientHeight, 10);

    this.setSize(this.gridWrapper, 'height', height);
    return height;
  };

  setGridWidth = () => {
    if (!this.grid) return;

    const width = parseInt(this.contaner.clientWidth, 10);

    this.setSize(this.grid, 'width', width)
  };

  setContentHeight = h => {
    if (!h || !this.grid) return;

    const height = h || parseInt(this.grid.clientHeight, 10);

    this.setSize(this.content, 'height', height)
  };

  setSize = (block, size, value) =>
    block.style[size] = `${value}px`;

  getContainerRef = b => this.contaner = b;
  getContentRef = b => this.content = b;
  getGridWrapperRef = b => this.gridWrapper = b;
  getGridRef = b => this.grid = b;

  render() {
    const { data } = this.props;
    return (
      <Container getRef={this.getContainerRef} className={s.wrapper}>
        <FlexGrid className={s.container} justify="start" align="start" wrap="false">
          <div className={s.content} ref={this.getContentRef}>
            <Title className={s.title} light size="2">Квартиры</Title>
            <Content className={s.text} size="4" gray>
              Мы тщательно отбираем и проверяем все объекты, представленные на нашем сайте.
              Вы можете быть уверены, что данные квартиры соответствуют своему описанию,
              и документы, представленные реальными владельцами прошли верификацию.
            </Content>
            <div className={s.btn}>
              <LinkIcon gray to="/y">
                Все объявления
              </LinkIcon>
            </div>
          </div>
          <div ref={this.getGridWrapperRef} className={s.grid__wrapper}>
            <ItemTilesGrid getRef={this.getGridRef}
                           limit={5} className={s.grid}
                           onChange={this.update}
                           data={data}/>
          </div>
        </FlexGrid>
      </Container>
    )
  }
}

