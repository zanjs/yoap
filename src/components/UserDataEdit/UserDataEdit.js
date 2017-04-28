import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  ItemPageInfoTitle, Content, FlexGrid,
  Image, Svg, Title, InputClean,
} from 'components'
import { createHandleChange, createHandleBlur } from 'validation/userValidation'
import { isEmpty, classNames } from 'helpers'
import s from './UserDataEdit.sass'
import verifiedIcon from 'icons/ui/verifed.svg'

@observer
export default class UserDataEdit extends Component {
  placeholders = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Старый пароль',
    password_new: 'Новый пароль',
  };

  state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    password_new: '',
    edit: false,

    errors: {},
    success: {},
    normal: {},
  };

  onBlur = createHandleBlur(this);
  onChange = createHandleChange(this);

  extendInputProps = name => {
    const { isFetching } = this.props;
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
      type: 'text',

      disabled: isFetching
    }
  };
  extendPasswordInput = name => {
    const { isFetching } = this.props;
    const { success, errors, normal } = this.state;
    return {
      name, className: s.password,
      placeholder: this.placeholders[name],

      defaultValue: '',

      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      msg: errors[name] || success[name],
      bigMsg: true,

      onBlur: this.onPasswordBlur,
      onChange: this.onPasswordChange,

      required: true,
      type: 'password',


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

  Input = ({isSuccess, isError, bigMsg, msg, isNormal, className, ...rest}) => (
    <div className={s.input__wrapper}>
      <InputClean className={classNames(s.input, className)} {...rest}/>
      {msg && <span className={classNames(s.msg, bigMsg && s.msg_big, isError && s.msg_error, isNormal && s.msg_normal)}>
        {msg}
      </span>}
    </div>
  );

  onPasswordBlur = ({target}) => this.setState({
    [target.name]: target.value
  })
  onPasswordChange = ({target}) => this.setState({
    [target.name]: target.value
  })

  componentWillReceiveProps(nextProps) {
    const { isError, isFetching} = nextProps;

    if (isEmpty(isError) && isEmpty(isFetching)) {
      return this.setState({
        edit: false
      })
    }

    if (!isEmpty(isError) && isError.formImport) {
      this.setState(state => ({
        edit: true,
        success: {},
        normal: {},
        errors: {
          ...state.errors,
          ...isError
        }
      }))
    }
  }

  render() {
    const {
      submitHandler,
      extendInputProps,
      extendPasswordInput,
      Input,
      state: { edit },
      props: { image, phone, email, isFetching, name, verified }
    } = this;
    return (
      <div className={classNames(s.wrapper, isFetching && s.fetch)}>
        <ItemPageInfoTitle title="Мой профиль">
          <Content nooffsets gray onClick={!isFetching && submitHandler}
                   className={s.edit_btn}>
            {isFetching ? 'Синхронизируем' : edit ? 'Сохранить' : 'Изменить'}
          </Content>
        </ItemPageInfoTitle>

        <FlexGrid justify="start" align="start" className={s.user}>
          <div className={s.image}>
            {image ? <Image src={image}/> : <div className={s.noImage}/>}
          </div>
          <div className={s.content}>
            <FlexGrid justify="start" align="center" className={s.title}>
              <Title className={classNames(s.title__item, edit && s.title_edit)}
                     light nooffsets size="6">
                {!edit && name}
                {edit && <Input {...extendInputProps('name')}/>}
              </Title>
              {!edit && verified && <Svg className={s.icon}
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

            {edit && <FlexGrid justify="space-between" align="start"
                               className={s.password__wrapper}>
              <Input {...extendPasswordInput('password')} />
              <Input {...extendPasswordInput('password_new')} />
            </FlexGrid>}
          </div>
        </FlexGrid>
      </div>
    )
  }
}

