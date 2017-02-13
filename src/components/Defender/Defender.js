import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { FormGroup, Button, FlexGrid } from 'components'
import { Redirect } from 'react-router-dom'
import s from './Defender.sass'


const mapStateToProps = ({size: {width, height}}) => ({
  width: `${width}px`, height: `${height}px`
});

@inject(mapStateToProps) @observer
export default class Defender extends Component {
  state = {isError: null, msg: null};

  submitHandler = e => {
    e.preventDefault();

    const respond = this.props.submitHandler(this.input.value);

    if (respond) {
      this.setState({isError: true, msg: respond})
    }

    console.log('submitted', this.input.value);

    return false;
  };

  onFocus = () => {
    this.setState({isError: null, msg: null})
  };

  render() {
    const { width, height, userHasAuthorized } = this.props;
    const { isError, msg } = this.state;

    if (userHasAuthorized) {
      return <Redirect to="/"/>
    }

    return (
      <FlexGrid direction="column" justify="center" align="center"
                className={s.defender} style={{width, height}}>
        <form className={s.wrapper} onSubmit={this.submitHandler}>
          <div className={s.logo}>Enter to App</div>
          <FormGroup getRef={b => this.input = b} isError={isError} msg={msg}
                     onFocus={this.onFocus} className={s.input}
                     placeholder="Password*" type="password" required/>
          <Button className={s.btn}>Enter</Button>
        </form>
      </FlexGrid>
    )
  }
}

