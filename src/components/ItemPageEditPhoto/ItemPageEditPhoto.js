import React, { Component } from 'react'
import { PhotoEdit, PhotoGallery, Svg, Title } from 'components'
import s from './ItemPageEditPhoto.sass'

import addIcon from 'icons/ui/add-box.svg'

export default class ItemPageEditPhoto extends Component {
  render() {
    const { images } = this.props;
    const isEmpty = !images;

    return (
      <div className={s.wrapper}>
        {/*<PhotoEdit data={images[0]}/>*/}
        {isEmpty && <div className={s.upload}>
          <div className={s.upload__wrapper}>
            <Svg src={addIcon} className={s.upload__icon}/>
            <Title size="5" white center>
              Перетащите фото <br/>
              для загрузки
            </Title>
          </div>
        </div>}
        {!isEmpty && <PhotoGallery />}
      </div>
    )
  }
}

