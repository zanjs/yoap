import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, TodoItem } from 'components'

@inject(({todo: {data}}) => ({data})) @observer
export default class TodosContainer extends Component {
  render() {
    const todos = this.props.data.map((data => (
      <TodoItem {...data} key={data.id}/>
    )));

    return (
      <Container type="wrapper">
        {todos}
      </Container>
    )
  }
}

