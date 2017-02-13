import React, { Component } from 'react'
import { Checkbox, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './TodoItem.sass'


const TodoItem = (data) => (
  <FlexGrid justify="space-between" align="center" className={s.wrapper}>
    <Checkbox isActive={data.completed} onClick={data.toggle} className={data.completed ? s.active : null}>
      {data.value}
    </Checkbox>
    <FlexGrid justify="space-between" align="center" className={s.actions}>
      {!data.completed && <div className={s.complete} onClick={data.complete}/>}
      <div className={s.clear} onClick={data.destroy}/>
    </FlexGrid>
  </FlexGrid>
);

export default TodoItem;

