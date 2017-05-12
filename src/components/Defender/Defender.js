import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { FormGroup, Content, Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './Defender.sass'

import logoIcon from 'icons/logo.svg'
import lockIcon from 'icons/ui/lock.svg'

const description = (
  <span>
    Каждый 10 из первой 1000 пользователей получат 100₽ на телефон 💯💯💯 <br/> <br/>
    Где искать пароль? 🕵 <br/>
    Ищите в сети, спрашивайте у друзей, знакомых, в комментариях групп и пабликов — помните он где-то рядом!👣
  </span>
);
const descriptionContent = `
Каждый 10 из первой 1000 пользователей получат 100₽ на телефон💯💯💯
Где искать пароль? 🕵🏿 
Ищите в сети, спрашивайте у друзей, знакомых, в пабликах вроде 'подслушано' и помните он где-то рядом!👣
`;

const mapStateToProps = ({device: {width, height}}) => ({
  width: `${width}px`, height: `${height}px`,
});

@inject(mapStateToProps) @observer
export default class Defender extends Component {
  static description = descriptionContent;
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
      onChange
    } = this.props;

    return (
      <FlexGrid direction="column" justify="center" align="center"
                className={s.defender} style={{width, height}}>
        <form className={classNames(s.wrapper, isFetching && s.fetch)} onSubmit={this.submitHandler}>
          <div className={s.logo}>
            <Svg src={logoIcon} className={s.logo__icon}/>
          </div>
          <FormGroup onChange={onChange} isError={isError} msg={isError}
                     onFocus={this.onFocus} wrapperClassName={s.input}
                     name="yoap-password"
                     theme="transparent" placeholder="Password*"
                     type="password" required>
            {!isError && <Svg src={lockIcon} className={s.lock_icon}/>}
          </FormGroup>
          <Content white>{description}</Content>
        </form>
      </FlexGrid>
    )
  }
}

