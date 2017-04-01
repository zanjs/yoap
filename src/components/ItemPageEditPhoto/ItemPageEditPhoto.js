import React, { Component } from 'react'
import { PhotoEdit, PhotoGallery, Svg, Title } from 'components'
import { classNames } from 'helpers'
import s from './ItemPageEditPhoto.sass'

import addIcon from 'icons/ui/add-box.svg'

const PhotoEmpty = ({isActive, onClick}) => (
  <div className={classNames(s.upload, isActive && s.upload_active)}
       onClick={onClick}>
    <div className={s.upload__wrapper}>
      <Svg src={addIcon} className={s.upload__icon}/>
      <Title className={s.upload__title}
             size="5" white center>
        Перетащите фото <br/>
        для загрузки
      </Title>
    </div>
  </div>
);

export default class ItemPageEditPhoto extends Component {
  state = {
    Dropzone: null,
    toDrop: false,
    data: null
  };

  componentWillMount() {
    System.import('react-dropzone')
      .then(module => this.setState({
        Dropzone: module
      }));
  }

  parseFiles = files => {
    const { data } = this.state;

    return [
      ...(data || []),
      ...files
    ];
  };

  onDrop = files => {
    this.setState({
      toDrop: false,
      data: this.parseFiles(files)
    })
  };
  onDragOver = () => {
    this.setState({toDrop: true})
  };
  onDragLeave = () => {
    this.setState({toDrop: false})
  };

  getDropZoneRef = b => this.dropzone = b;

  openUpload = () => {
    if (this.dropzone) {
      this.dropzone.open();
    }
  };

  onGalleryChange = (data) => {
    this.setState({data});
  };

  render() {
    if (!this.state.Dropzone)
      return null;

    const {
      state: {Dropzone, toDrop, data},
      onDrop,
      onDragLeave,
      onDragOver,
      getDropZoneRef,
      openUpload,
      onGalleryChange
    } = this;

    const isEmpty = !data || !data.length;

    return (
      <Dropzone disableClick onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                ref={getDropZoneRef}
                className={s.wrapper}>
        {/*<PhotoEdit data={images[0]}/>*/}
        {(toDrop || isEmpty) && <PhotoEmpty onClick={openUpload} isActive={toDrop} />}
        {!isEmpty && <PhotoGallery onChange={onGalleryChange}
                                   data={data} />}
      </Dropzone>
    )
  }
}

