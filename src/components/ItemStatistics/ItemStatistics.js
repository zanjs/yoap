import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FlexGrid, Svg } from 'components'
import { classNames } from 'helpers'
import s from './ItemStatistics.sass'
import arrowIcon from 'icons/ui/arrow-small.svg'

@observer
export default class ItemStatistics extends Component {
  state = {graphHidden: true};
  getItemPercent = (views, isPhone) => {
    const { props } = this;
    //const min = isPhone ? props.minPhoneViews : props.minViews;
    const max = (isPhone ? props.maxPhoneViews : props.maxViews) || 100;
    const percent = max / 100;

    return views / percent;
  }
  getItemHeight = (views, isPhone) =>
    `${this.getItemPercent(views, isPhone)}%`;

  componentDidMount() {
    setTimeout(this.fadeIn, 60)
  }

  fadeIn = () => {
    const days = [...this.graph.querySelectorAll(`.${s.item__day}`)]; //.reverse();
    const bars = [...this.graph.querySelectorAll(`.${s.item__bar}`)]; //.reverse();
    const dur = .7;
    const delay = .01;
    const ease = Elastic.easeOut.config(1, 0.3);

    bars.forEach((block, index) => {
      const del = index * (delay * 1000);
      const height = block.getAttribute('data-progress') || '0%'

      setTimeout(() => {
        TweenMax.fromTo(block, dur, {
          opacity: 0,
          height: '0%',
        }, {
          opacity: 1,
          height,
          ease
        })
      }, del);
    })

    TweenMax.staggerFromTo(days, dur, {
      opacity: 0,
      y: 20
    }, {
      opacity: .5,
      y: 0,
      ease
    }, delay, () => {
      this.setState({graphHidden: false})
    })
  }

  getGraphRef = b => this.graph = b;

  DesItem = ({name, value}) => (
    <FlexGrid justify="space-between" align="center"
              className={s.des__item}>
      <span className={s.des__item__title}>{name}</span>
      <span className={s.des__item__content}>{value}</span>
    </FlexGrid>
  )
  render() {
    const {
      data, viewsSum, phoneViewsSum,
      favoritesSum, favoritesUnsetSum,
      onPrevClick, onNextClick, id,
    } = this.props;
    const { graphHidden } = this.state;
    const { getItemHeight, getGraphRef, DesItem } = this;

    if (!data || !data.length) {
      return null;
    }

    return (
      <div className={s.wrapper}>
        <FlexGrid className={s.statistics} justify="space-between" align="start">
          <FlexGrid justify="space-between" align="stretch"
                    getRef={getGraphRef}
                    className={s.graph}>
            {data.map((item, key) => {
              const height = getItemHeight(item.views);
              return (
                <div className={s.item} key={key}>
                  <div className={s.item__bar__wrapper}>
                    <div style={{height: height}} data-progress={height}
                         className={classNames(s.item__bar, graphHidden && s.item__bar_hidden)}>
                      <span className={s.item__num}>{item.views}</span>
                    </div>
                  </div>
                  <span className={classNames(s.item__day, graphHidden && s.item__day_hidden)}>{item.day}</span>
                </div>
              )
            })}
          </FlexGrid>
          <div className={s.des}>
            <FlexGrid justify="space-between" align="center"
                      className={s.des__title}>
              <Svg onClick={onPrevClick} src={arrowIcon} className={s.des__arrow_left} />
              <span className={s.des__title__content}>{`Объявление №${id}`}</span>
              <Svg onClick={onNextClick} src={arrowIcon} className={s.des__arrow_right} />
            </FlexGrid>
            <div className={s.des__content}>
              <DesItem name="Просмотры объявления" value={viewsSum}/>
              <DesItem name="Просмотры телефона" value={phoneViewsSum}/>
              <DesItem name="Добавили в избранное" value={favoritesSum}/>
              <DesItem name="Убрали из избранного" value={favoritesUnsetSum}/>
            </div>
          </div>
        </FlexGrid>
      </div>
    )
  }
}

