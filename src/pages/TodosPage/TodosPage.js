import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { observer, inject } from "mobx-react";
import { classNames, isEmpty } from 'helpers'

import {
  MobileHeaderRatio, DesktopHeaderRatio,
  pagesTitles, dur as duration, ease as easeConfig
} from 'config'

import {
  Header, Title, Container, Link, Text,
  FormGroup, FlexGrid, Button
} from 'components'

import { TodosContainer } from 'containers'

import s from './TodosPage.sass'


const mapStateToProps = ({
  device: {
    height, width, isMobile
  },
  todo: {
    addTodo, completedCount, length,

    clearCompleted, toggleAll, removeAll
  }
}) => ({
  height, width, isMobile,

  addTodo, completedCount, length,
  clearCompleted, toggleAll, removeAll
});

@inject(mapStateToProps) @observer
export default class TodosPage extends Component {
  state = {
    isError: false,
    msg: 'Input cannot be empty!'
  };

  addTodo = (e) => {
    let value = this.addTodoInput.value;

    if (e.keyCode && e.keyCode != 13) {
      return false;
    }

    if (isEmpty(value)) return this.setState({
      isError: true
    });

    this.props.addTodo(value);
    this.addTodoInput.value = '';

    if (!this.state.isError) return;

    this.setState({
      isError: false
    });
  };

  clearCompleted  = () => this.props.clearCompleted();
  completeAll = () => this.props.toggleAll(true);
  removeAll = () => this.props.removeAll();
  clearAll = () => this.props.toggleAll(false);

  render() {
    const props = this.props;
    const { isMobile, completedCount, length } = props;
    const height = props.height * (isMobile ? MobileHeaderRatio : DesktopHeaderRatio ) + 'px';
    const { isError, msg } = this.state;

    return (
      <div className={s.about}>
        <Helmet title={pagesTitles.TodosPage}/>

        <Header style={{height}} className={s.header}>
          <Title type="1">Todo List</Title>
          {!!completedCount && <Title className={s.title}>Active Todos - {completedCount}</Title>}
          {!!length && <Title className={s.title}>Summary Todos - {length}</Title>}
        </Header>

        <Container type="article">
          <FlexGrid align="center" justify="center" tag={Container} type="wrapper" className={s.action}>
            <FormGroup required wrapperClassName={s.input_add} className={s.input_add}
                       isError={isError} msg={isError && msg || null}
                       getRef={b => this.addTodoInput = b} onKeyUp={this.addTodo} />
            <Button type="min" onMouseDown={this.addTodo} className={s.button}>Add Todo</Button>
          </FlexGrid>
        </Container>

        <Container type="article" className={s.container}>
          <TodosContainer />
        </Container>

        <Container type="article" className={classNames(s.container, s.bottom)}>
          <FlexGrid align="center" justify="center" tag={Container} type="wrapper" className={s.action}>
            {!!completedCount && <Button type="min" onClick={this.clearCompleted} className={s.button}>Clear Completed</Button>}
            {!!length && <Button type="min" onClick={this.completeAll} className={s.button}>Complete All</Button>}
            {!!completedCount && <Button type="blue min" onClick={this.clearAll} className={s.button}>Clear All</Button>}
            {!!length && <Button type="pink min" onClick={this.removeAll} className={s.button}>Remove All</Button>}
          </FlexGrid>
        </Container>
      </div>
    )
  }
}
