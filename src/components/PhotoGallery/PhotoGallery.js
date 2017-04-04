import React, { Component } from 'react'
import {
  SortableContainer, SortableElement, arrayMove
} from 'react-sortable-hoc'
import { FlexGrid, Title, Svg, Image, Content } from 'components'
import { classNames } from 'helpers'
import s from './PhotoGallery.sass'

import deleteIcon from 'icons/ui/delete.svg'

const Item = SortableElement(class SortableItem extends Component {

  getRef = b => this.wrapper = b;

  resize = () => {
    const { clientWidth } = this.wrapper;

    this.wrapper.style.height = `${parseInt(clientWidth, 10)}px`;
  };

  resizeHandler = () => setTimeout(
    this.resize, 60
  );

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    const {data: {src, isActive, isLoading}, position, onClick} = this.props;
    const _className = classNames(
      s.item,
      isActive && s.item_active,
      isLoading && s.item_loading
    );

    return (
      <div ref={this.getRef} className={_className}
           onClick={() => onClick(position)}>
        <Image className={s.item__image} src={src}/>
      </div>
    )
  }
});

const Grid = SortableContainer(({data, onItemClick}) => (
  <FlexGrid justify="start" align="start" wrap="true"
            className={s.grid}>
    {data.map((item, key) => (
      <Item key={key} index={key} position={key}
            onClick={onItemClick} data={item}/>
    ))}
  </FlexGrid>
));

export default class PhotoGallery extends Component {
  state = {
    data: [],
    toRemove: false,
    isDragged: false,
    activeElement: null
  };

  parseData = data => {
    const filteredData = data && data.filter(item => !!item);

    this.setState({
      data: filteredData && filteredData.map((item, index) => ({
        src: item.file && item.file.preview || item.preview || item,
        ...(typeof item === 'string' ? {} : item),
        isActive: index === 0
      })) || []
    })
  };

  componentWillMount() {
    this.parseData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.parseData(nextProps.data);
    }
  }

  onChange = (toRemove, oldIndex, newIndex) => {
    const { onChange } = this.props;
    if (!onChange)
      return;

    if (toRemove) {
      return onChange(
        this.props.data
        .filter((item, index) => index !== oldIndex)
      )
    }

    const data = [...this.props.data];
    onChange(
      arrayMove(data, oldIndex, newIndex)
    )
  };

  cleanAll = () => {
    console.log('clicked');
    this.setState({
      isDragged: false,
      toRemove: false,
      data: []
    });

    this.props.onChange([]);
  };

  onSortEnd = props => {
    const { oldIndex, newIndex } = props;
    const { toRemove, data } = this.state;

    const _data = toRemove
      ? data.filter((item, index) => index !== oldIndex)
      : arrayMove(data, oldIndex, newIndex);

    this.onChange(toRemove, oldIndex, newIndex);

    this.setState({
      data: this.setActive(_data),
      isDragged: false,
      toRemove: false
    });
  };
  onSortStart = props =>
    this.setState({
      isDragged: true,
      activeElement: props.index
    });

  mouseEnterHandler = e => {
    if (!this.state.isDragged)
      return;

    if (this.state.toRemove)
      return;

    this.setState({toRemove: true});
    this.helperClassHandler(true);
  };

  mouseLeaveHandler = e => {
    if (!this.state.isDragged)
      return;

    if (!this.state.toRemove)
      return;

    this.setState({toRemove: false});
    this.helperClassHandler(false);
  };

  helperClassHandler = value => {
    const block = document.querySelector(`.${s.item_drag}`);

    block.className = classNames(
      s.item, s.item_drag,
      value && s.item_remove
    )
  };

  setActive = data => data.map(
    (item, key) => ({
      ...item,
      isActive: key === 0
    })
  );

  itemClickHandler = index => {
    console.log(index);
    if (this.props.onClick) {
      this.props.onClick(index);
    }
  };

  render() {
    const {
      state: { data, isDragged },
      onSortEnd,
      onSortStart,
      mouseLeaveHandler,
      mouseEnterHandler,
      itemClickHandler,
      cleanAll
    } = this;
    return (
      <div className={s.wrapper}>
        <FlexGrid direction="column" justify="space-between"
                  align="stretch"
                  className={s.container}>

          <div className={s.gallery}>
            <FlexGrid tag="header" className={s.header}
                      justify="space-between" align="center">
              <Title size="5" gray light
                     nooffsets>
                Фото объекта
              </Title>
              <Content onClick={cleanAll} className={s.clear}
                       gray size="5" nooffsets>Удалить все</Content>
            </FlexGrid>
            <Grid data={data} axis="xy"
                  distance={10}
                  onItemClick={itemClickHandler}
                  helperClass={s.item_drag}
                  onSortStart={onSortStart}
                  onSortEnd={onSortEnd} />
          </div>

          <FlexGrid onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}
                    className={classNames(s.remove, isDragged && s.remove_active)}
                    justify="center" align="center">
            <Svg className={s.remove__icon} src={deleteIcon}/>
          </FlexGrid>
        </FlexGrid>
      </div>
    )
  }
}

