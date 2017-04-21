import React, { Component } from 'react'
import {
  ItemPageInfoTitle, Content, FlexGrid,
  Image, Svg, Title, InputClean,
} from 'components'
import { createHandleChange, createHandleBlur } from 'validation/userValidation'
import { isEmpty, classNames } from 'helpers'
import s from './UserDataEdit.sass'

import verifiedIcon from 'icons/ui/verifed.svg'

export default class UserDataEdit extends Component {
  placeholders = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
  };

  state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    edit: false,

    errors: {},
    success: {},
    normal: {},
  };

  onBlur = createHandleBlur(this);
  onChange = createHandleChange(this);

  extendInputProps = name => {
    const { isFetching, isError } = this.props;
    const { success, errors, normal } = this.state;
    return {
      name,
      placeholder: this.placeholders[name],

      // TODO: Fix default value update
      defaultValue: this.props[name],

      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      msg: errors[name] || success[name],

      onBlur: this.onBlur,
      onChange: this.onChange,

      required: true,
      type: name,


      disabled: isFetching
    }
  };

  isValid = () => {
    return isEmpty(this.state.errors);
  };

  submitHandler = (e) => {
    e && e.preventDefault();

    if (!this.state.edit) {
      return this.switchEdit()
    }

    if (this.isValid()) {
      this.switchEdit();
      this.saveValues();
    }

    return false;
  };
  saveValues = (state = this.state) => {
    const {normal, errors, success, edit, ...rest} = state;
    this.props.onSubmit(rest);
  };

  switchEdit = () => this.setState(state => ({
    edit: !state.edit
  }));

  Input = ({isSuccess, isError, msg, isNormal, ...rest}) => (
    <div className={s.input__wrapper}>
      <InputClean className={s.input} {...rest}/>
      {msg && <span className={classNames(s.msg, isError && s.msg_error, isNormal && s.msg_normal)}>
        {msg}
      </span>}
    </div>
  );

  render() {
    const {
      submitHandler,
      extendInputProps,
      Input,
      state: { edit },
      props: { image, phone, email, name, isVerified }
    } = this;
    return (
      <div className={s.wrapper}>
        <ItemPageInfoTitle title="Мой профиль">
          <Content nooffsets gray onClick={submitHandler}
                   className={s.edit_btn}>
            {edit ? 'Сохранить' : 'Изменить'}
          </Content>
        </ItemPageInfoTitle>

        <FlexGrid justify="start" align="start" className={s.user}>
          <div className={s.image}>
            {image ? <Image src={image}/> : <div className={s.noImage}/>}
          </div>
          <div className={s.content}>
            <FlexGrid justify="start" align="center" className={s.title}>
              <Title className={s.item} light nooffsets size="6">
                {!edit && name}
                {edit && <Input {...extendInputProps('name')}/>}
              </Title>
              {isVerified && <Svg className={s.icon}
                                  src={verifiedIcon}/>}
            </FlexGrid>
            <Content className={s.item} tag="div" gray size="5">
              {!edit && email}
              {edit && <Input {...extendInputProps('email')}/>}
            </Content>
            <Content className={s.item} tag="div" gray size="5">
              {!edit && phone}
              {edit && <Input {...extendInputProps('phone')} />}
            </Content>
          </div>
        </FlexGrid>
      </div>
    )
  }
}

