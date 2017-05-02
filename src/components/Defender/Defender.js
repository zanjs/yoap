import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { FormGroup, Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './Defender.sass'

import logoIcon from 'icons/logo.svg'
import lockIcon from 'icons/ui/lock.svg'

const mapStateToProps = ({device: {width, height}}) => ({
  width: `${width}px`, height: `${height}px`
});

@inject(mapStateToProps) @observer
export default class Defender extends Component {
  submitHandler = e => {
    e.preventDefault();

    this.props.onSubmit();

    return false;
  };

  onFocus = () => {
    this.props.onCleanUp();
  };

  render() {
    const {
      width, height,
      isError, isFetching,
      isAuthorized,
      onChange
    } = this.props;

    if (isAuthorized) {
      return <Redirect to="/"/>
    }

    return (
      <FlexGrid direction="column" justify="center" align="center"
                className={s.defender} style={{width, height}}>
        <form className={classNames(s.wrapper, isFetching && s.fetch)} onSubmit={this.submitHandler}>
          <div className={s.logo}>
            <Svg src={logoIcon} className={s.logo__icon}/>
          </div>
          <FormGroup onChange={onChange} isError={isError} msg={isError}
                     onFocus={this.onFocus} wrapperClassName={s.input}
                     theme="transparent" placeholder="Password*"
                     type="password" required>
            {!isError && <Svg src={lockIcon} className={s.lock_icon}/>}
          </FormGroup>
        </form>
      </FlexGrid>
    )
  }
}

