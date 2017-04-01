import React, { Component } from 'react'
import { FlexGrid, Button, Container } from 'components'
import s from './ButtonsAction.sass'

const Wrapper = ({children, className}) => (
  <FlexGrid className={className} justify="end" align="center">
    {children}
  </FlexGrid>
);

const ButtonsAction = ({withContainer, children}) => {
  if (withContainer)
    return (
      <Container className={s.wrapper}>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    );

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
};

export default ButtonsAction;

