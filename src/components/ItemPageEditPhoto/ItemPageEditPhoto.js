import React, { Component } from 'react'
import { PhotoEdit, PhotoGallery, Svg, Title } from 'components'
import { classNames } from 'helpers'
import { imagesUpload } from 'api'
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
    data: null,
    selected: null,
    isFetching: false
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.data && nextProps.data && nextProps.data.gallery) {
      this.setState({
        data: nextProps.data.gallery
      }, this.onChangeCallback)
    }
  }
  componentWillMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data.gallery
      }, this.onChangeCallback)
    }

    System.import('react-dropzone')
      .then(module => this.setState({
        Dropzone: module
      }));
  }

  parseFiles = files => {
    const { data } = this.state;
    const res = [
      ...(data || []),
      ...(files.map(item => ({
        file: item,
        isLoading: false
      })))
    ];

    return this.filterNull(res);
  };

  onDrop = files => {
    this.setState({
      toDrop: false,
      data: this.parseFiles(files)
    }, this.onChange)
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
    if (this.state.isFetching)
      return null;
    this.setState({data}, this.onChangeCallback);
  };

  filterNull = data => data.filter(item => !!item);

  onChange = () => {
    const needLoading = [];
    const { data } = this.state;

    data.forEach((file, index) => {
      if (file.file)
        needLoading.push(index)
    });

    this.setState({
      data: this.filterNull(data.map(item => {
        if (item.file)
          return {
            ...item,
            isLoading: true
          };

        return item;
      })),
      isFetching: true
    });

    if (needLoading.length) {
      const images = needLoading.map(item => {
        return data[item].file;
      });

      imagesUpload(images).then(newData => {
        let modifiedData = [...data];
        let index = 0;

        needLoading.forEach(item => {
          modifiedData[item] = newData[index];

          index += 1;
        });

        this.setState({
          data: modifiedData,
          isFetching: false
        }, this.onChangeCallback)
      })
    }
  };

  onChangeCallback = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.data);
    }
  };

  onItemClickHandler = (index) => {
    this.setState({
      selected: index
    })
  };

  closeSelected = () => {
    this.setState({
      selected: null
    })
  };

  render() {
    if (!this.state.Dropzone)
      return null;

    const {
      state: {Dropzone, toDrop, selected, data, isFetching},
      onDrop,
      onDragLeave,
      onDragOver,
      getDropZoneRef,
      openUpload,
      onGalleryChange,
      onItemClickHandler,
      closeSelected
    } = this;

    const isEmpty = !data || !data.length;
    const isSelected = selected != null;

    return (
      <Dropzone disableClick onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                ref={getDropZoneRef}
                className={s.wrapper}>
        {isSelected && <PhotoEdit data={data[selected]} onClose={closeSelected}/>}
        {(toDrop || isEmpty) && <PhotoEmpty onClick={openUpload} isActive={toDrop} />}
        {!isSelected && !isEmpty && <PhotoGallery onChange={onGalleryChange}
                                                  onClick={onItemClickHandler}
                                                  isFetching={isFetching} data={data} />}
      </Dropzone>
    )
  }
}

