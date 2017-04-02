import React, { Component } from 'react'
import { Content, Select, InputClean, Title, FlexGrid } from 'components'
import { statusTypes } from 'constants'
import s from './ManageItemsSort.sass'


export default class ManageItemsSort extends Component {
  types = statusTypes.types;
  selectContent = [
    'Без сортировки',
    ...this.types.map(item => item.name)
  ];

  selectHandler = e => {
    const { value } = e.target;

    if (this.props.onSortStatusChange) {
      const type = value === this.selectContent[0]
        ? {}
        : this.types.find(item => item.name === value);

      this.props.onSortStatusChange(type.id);
    }
  };

  inputHandler = e => {
    if (this.props.onSort) {
      this.props.onSort(e.target.value)
    }
  };

  render() {
    const {
      selectContent,
      selectHandler,
      inputHandler,
      props: {className}
    } = this;
    return (
      <FlexGrid className={className} justify="space-between" align="center">
        <Title nooffsets gray size="5">
          <InputClean onChange={inputHandler} className={s.input}
                      focus placeholder="Поиск по совпадениям"/>
        </Title>
        <Content to="/y" gray>
          <Select onChange={selectHandler} data={selectContent} inherit/>
        </Content>
      </FlexGrid>
    )
  }
}

