import React, { Component } from 'react'
import {
  SortableContainer, SortableElement, arrayMove
} from 'react-sortable-hoc'
import { FlexGrid, Title, Svg, Image } from 'components'
import { classNames } from 'helpers'
import s from './PhotoGallery.sass'

import deleteIcon from 'icons/ui/delete.svg'

const Item = SortableElement(({data: {src, isActive}, position, onClick}) => (
  <div className={classNames(s.item, isActive && s.item_active)}
       onClick={() => onClick(position)}>
    <Image className={s.item__image} src={src}/>
  </div>
));

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

  componentWillMount() {
    this.setState({
      data: this.props.data.map((item, index) => ({
        src: item,
        isActive: index === 0
      }))
    })
  }

  onSortEnd = props => {
    const { oldIndex, newIndex } = props;
    const { toRemove, data } = this.state;

    const _data = toRemove
      ? data.filter((item, index) => index !== oldIndex)
      : arrayMove(data, oldIndex, newIndex);

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
    console.log('clicked on', index);
  };

  render() {
    const {
      state: { data, isDragged },
      onSortEnd,
      onSortStart,
      mouseLeaveHandler,
      mouseEnterHandler,
      itemClickHandler
    } = this;
    return (
      <div className={s.wrapper}>
        <FlexGrid direction="column" justify="space-between"
                  align="stretch"
                  className={s.container}>

          <div className={s.gallery}>
            <Title className={s.title} size="5"
                   gray light>
              Фото объекта
            </Title>
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

