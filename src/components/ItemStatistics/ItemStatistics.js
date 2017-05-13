import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FlexGrid, Svg } from 'components'
import { classNames } from 'helpers'
import s from './ItemStatistics.sass'
import arrowIcon from 'icons/ui/arrow-small.svg'

@observer
export default class ItemStatistics extends Component {
  state = {graphHidden: true, field: 'views'};
  toUpper = word => {
    const first = word[0];
    return `${first.toUpperCase()}${word.replace(first, '')}`
  }
  getItemPercent = (value = 0, field = 'views') => {
    const { props } = this;
    const fieldMax = `max${this.toUpper(field)}`;
    //const min = isPhone ? props.minPhoneViews : props.minViews;
    const max = props[fieldMax] || 100;
    const percent = max / 100;
    const res = value / percent;

    if (isNaN(res)) {
      return 0;
    }

    return res
  }
  getItemHeight = (value, field) =>
    `${this.getItemPercent(value, field)}%`;

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

  changeFiled = field => {
    this.setState({field});
  }

  DesItem = ({name, field, value, activeField}) => (
    <FlexGrid justify="space-between" align="center"
              onClick={() => this.changeFiled(field)}
              className={classNames(s.des__item, activeField === field && s.des__item_active)}>
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
    const { graphHidden, field } = this.state;
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
              const value = item[field];
              const height = getItemHeight(value, field);
              console.log(window.block = {value, item, height})
              return (
                <div className={s.item} key={key}>
                  <div className={s.item__bar__wrapper}>
                    <div style={{height: height}} data-progress={height}
                         className={classNames(s.item__bar, graphHidden && s.item__bar_hidden)}>
                      <span className={s.item__num}>{value}</span>
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
              <DesItem activeField={field} field="views"
                       name="Просмотры объявления" value={viewsSum}/>
              <DesItem activeField={field} field="phoneViews"
                       name="Просмотры телефона" value={phoneViewsSum}/>
              <DesItem activeField={field} field="favorites"
                       name="Добавили в избранное" value={favoritesSum}/>
              <DesItem activeField={field} field="favoritesUnset"
                       name="Убрали из избранного" value={favoritesUnsetSum}/>
            </div>
          </div>
        </FlexGrid>
      </div>
    )
  }
}

