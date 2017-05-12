import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Button, FormGroup, Title, FlexGrid, Content } from 'components'
import { Link as RouterLink } from 'react-router-dom'
import { createHandleChange, createHandleBlur  } from 'validation/userValidation'
import { classNames, isEmpty } from 'helpers'
import s from './LoginForm.sass'

@observer
export default class LoginForm extends Component {
  placeholders = {
    identifier: 'Phone/Email',
    password: 'Password'
  };

  initialState = {
    identifier: '',
    password: '',

    errors: {},
    success: {},
    normal: {},
  };

  state = {
    ...this.initialState,
    ...(this.props.initialValues || {})
  };

  onBlur = createHandleBlur(this);
  onChange = createHandleChange(this);

  extendInputProps = name => {
    const { isFetching, isError } = this.props;
    const { success, errors, normal, identifier } = this.state;
    const isPhone = !isEmpty(identifier) && !isNaN(
      parseInt(identifier.replace(/ /gi, '').replace(/\(|\)|\-/gi, ''), 10)
    );

    return {
      name,
      ph: this.placeholders[name],

      // TODO: Fix default value update
      defaultValue: this.state[name],

      isSuccess: success[name],
      isError: errors[name],
      isNormal: normal[name],

      onBlur: this.onBlur,
      onChange: this.onChange,

      required: true,
      type: name || 'text',
      isPhone,

      msg: errors[name],

      disabled: isFetching
    }
  };

  isValid = () => {
    return isEmpty(this.state.errors);
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.props.login();
    }

    return false;
  };
  saveValues = (values) => {
    const {normal, errors, success, ...rest} = values;
    this.props.saveValues(rest);
  };

  componentWillUpdate(nextProps, nextState) {
    this.saveValues(nextState);
  }
  componentDidMount() {
    this.identifierInput && this.identifierInput.focus();
  }
  componentWillReceiveProps(nextProps) {
    const { isError } = nextProps;

    if (!isEmpty(isError)) {
      this.setState({
        errors: isError,
        success: {},
        normal: {}
      });
    }
  }

  getIdentifierInputRef = b => this.identifierInput = b;
  getPasswordInputRef = b => this.passwordInput = b;

  isDuplicated(data) {
    return data && data.notUnique;
  }

  render() {
    const { isFetching, isError, errorMessage, className } = this.props;

    const isDuplicated = this.isDuplicated(isError);

    return (
      <form onSubmit={this.submitHandler} className={classNames(s.wrapper, className, isFetching && s.wrapper_disabled)}>
        <Title size="2" light>Вход в личный <br/>кабинет</Title>
        <FormGroup {...this.extendInputProps('identifier')} getRef={this.getIdentifierInputRef}/>
        <FormGroup {...this.extendInputProps('password')} getRef={this.getPasswordInputRef}/>
        {isDuplicated && <Content>Мы сохранили ваши данные, нажмите "Готово"</Content>}
        {!isDuplicated && isError && <Content>
          {isError.message || isError.text || errorMessage || JSON.stringify(isError)}
        </Content>}
        <FlexGrid align="center" className={s.buttons}>
          <Button disabled={isFetching} buttonType='submit' type="pink" className={s.button}>Готово</Button>
          <Content tag={RouterLink} to="/you/restore"
                   gray size="5" className={s.reset}>
            Забыли пароль?
          </Content>
        </FlexGrid>
      </form>
    )
  }
}
