import React, { Component } from 'react'
import { FlexGrid, Button, Container } from 'components'
import s from './ButtonsAction.sass'

const Buttons = ({data, className}) => (
  <FlexGrid className={className} justify="end" align="center">
    {data.map(({content, ...rest}, key) => (
      <Button key={key} {...rest}>{content}</Button>
    ))}
  </FlexGrid>
);

const ButtonsAction = ({data, withContainer}) => {
  if (withContainer)
    return (
      <Container className={s.wrapper}>
        <Buttons data={data}/>
      </Container>
    );

  return <Buttons className={s.wrapper} data={data}/>
};

export default ButtonsAction;

