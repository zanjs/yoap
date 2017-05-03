import React, { Component } from 'react'
import ReactSlider from 'react-slider'
import {
  SliderImages, FlexGrid,
  Content, Title
} from 'components'
import s from './PhotoEdit.sass'


export default class PhotoEdit extends Component {
  state = {
    data: this.props.data
  };

  changeHandler = (props) => {
    console.log(props)
  };

  getImageRef = b =>
    this.image = b;

  render() {
    const { data } = this.state;
    const { onClose } = this.props;
    return (
      <div className={s.wrapper}>
        <header className={s.header}>
          <FlexGrid className={s.header__wrapper}
                    justify="space-between" align="center">
            <Content className={s.link} onClick={onClose}
                     white size="3">Назад</Content>
            <Content className={s.link} onClick={onClose}
                     white size="3">Готово</Content>
          </FlexGrid>
        </header>

        <SliderImages getRef={this.getImageRef} data={[data]}/>

        <section className={s.content}>
          <div className={s.content__wrapper}>

            <div className={s.item}>
              <Title size="6" white light>Контрастность</Title>
              <ReactSlider className={s.slider}
                           handleClassName={s.slider__handler}
                           onAfterChange={this.changeHandler}
                           min={0} max={100} />
            </div>

          </div>
        </section>
      </div>
    )
  }
}

