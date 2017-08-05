import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import { inject, observer } from 'mobx-react'
import { UserPhone, Link } from 'components'
import { findPhoneNumber } from 'api'

const mapStateToProps = ({user: {isAuthorized, redirectWhenLogin}}) => ({
  isAuthorized, redirectWhenLogin
})

@inject(mapStateToProps) @observer
export default class UserPhoneContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  isMount = false;

  componentWillMount() {
    this.isMount = true;
  };
  componentWillUnmount() {
    this.isMount = false;
  }

  state = {
    isError: false, phone: null,
    isFetching: false
  };

  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      const error = new Error(res.statusText);
      error.res = res;
      throw error
    }
  };
  fetchPhoneNumber = id => {
    findPhoneNumber(id)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(({data}) => {
        const res = jwtDecode(data);

        this.setState({
          phone: res.phone,
          isFetching: false,
          isError: false
        })
      })
      .catch(res => {
        if (res.res.status >= 400 || res.res.status < 404) {
          return this.setNotVerifiedError()
        }
        this.setState({
          isFetching: false,
          isError: res.message,
          phone: null
        })
      })
  };
  clickHandler = () => {
    if (!this.props.isAuthorized) {
      return this.setAuthError();
    }

    this.setState({isFetching: true, isError: false});
    this.fetchPhoneNumber(this.props.id);
  };
  setNotVerifiedError = () => {
    this.setState({
      isFetching: false,
      isError: (
        <span>
          Похоже, что вы вошли в свой аккаунт, но не подтвердили почтовый ящик. <br/>
          Вы можете выслать письмо верификации заново в личном кабинете. <br/>
          <Link type="underline" to="/you">Мой профиль</Link>
        </span>
      ),
      phone: null
    })
  };
  setAuthError = () => {
    this.redirectWhenLogin();

    this.setState({
      isError: (
        <span>
          Для просмотра номеров собственников
          Вам необходимо войти или зарегистрироваться и подтвердить аккаунт по почте.
          Сейчас мы перенаправим вас на страницу входа.
          После входа вы будете перенаправлены обратно. <br/>
          <Link type="underline" to="/login">Перейти прямо сейчас</Link>
        </span>
      )
    }, () => setTimeout(() => {
      if (!this.isMount)
        return null;

      return this.context.router.history.push('/login');
    }, 3000));
  };
  redirectWhenLogin = () => {
    this.props.redirectWhenLogin(
      this.context.router.route.match.url
    );
  };

  render() {
    const { className } = this.props;
    const { isError, phone, isFetching } = this.state;
    const { clickHandler } = this;

    return <UserPhone className={className}
                      onClick={clickHandler}
                      isFetching={isFetching}
                      isError={isError}
                      phone={phone}/>
  }
}

