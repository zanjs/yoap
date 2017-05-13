import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FlexGrid, Svg } from 'components'
import s from './ItemStatistics.sass'
import arrowIcon from 'icons/ui/arrow-small.svg'

@observer
export default class ItemStatistics extends Component {
  getItemPercent = (views, isPhone) => {
    const { props } = this;
    const min = isPhone ? props.minPhoneViews : props.minViews;
    const max = isPhone ? props.maxPhoneViews : props.maxViews;
    const percent = max / 100;

    return views / percent;
  }
  getItemHeight = (views, isPhone) =>
    `${this.getItemPercent(views, isPhone)}%`;

  render() {
    const {
      data, viewsSum, phoneViewsSum, id,
      onPrevClick, onNextClick
    } = this.props;
    const { getItemHeight } = this;

    if (!data || !data.length) {
      return null;
    }

    return (
      <div className={s.wrapper}>
        <FlexGrid justify="space-between" align="start">
          <FlexGrid justify="space-between" align="stretch"
                    className={s.graph}>
            {data.map((item, key) => {
              const height = getItemHeight(item.views);
              return (
                <div className={s.item} key={key}>
                  <div className={s.item__bar__wrapper}>
                    <div style={{height: height}}
                         className={s.item__bar}>
                      <span className={s.item__num}>{item.views}</span>
                    </div>
                  </div>
                  <span className={s.item__day}>{item.day}</span>
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
              <FlexGrid justify="space-between" align="center"
                        className={s.des__item}>
                <span className={s.des__item__title}>Просмотры объявления</span>
                <span className={s.des__item__content}>{viewsSum}</span>
              </FlexGrid>
              <FlexGrid justify="space-between" align="center"
                        className={s.des__item}>
                <span className={s.des__item__title}>Просмотры телефона</span>
                <span className={s.des__item__content}>{phoneViewsSum}</span>
              </FlexGrid>
            </div>
          </div>
        </FlexGrid>
      </div>
    )
  }
}

