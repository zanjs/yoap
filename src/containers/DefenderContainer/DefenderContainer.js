import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Defender } from 'components'
import { checkPassword } from 'api'

const mapStateToProps = ({user: {isAllowed, updateAllowed}}) => ({
  isAllowed,
  updateAllowed
})

@inject(mapStateToProps) @observer
export default class DefenderContainer extends Component {
  state = { value: null, isError: false, isFetching: false };
  static description = Defender.description;

  cleanUp = () => {
    this.setState({
      value: null, isError: false,
      isFetching: false
    })
  }

  changeHandler = ({target}) => this.setState({
    value: target.value
  })

  submitHandler = () => {
    this.setState({isFetching: true});
    checkPassword(this.state.value)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res
        } else {
          const error = new Error(res);
          error.response = res;
          throw error
        }
      })
      .then(res => res.json())
      .then(() => {
        this.setState({
          isFetching: false,
          isError: false
        });
        this.props.updateAllowed(true);
      })
      .catch(err => {
        const { response } = err;
        if (response) {
          return response.json().then(({message}) => {
            this.setState({isError: message, isFetching: false});
            this.props.updateAllowed(false);
          })
        }

        this.setState({
          isError: JSON.stringify(err), isFetching: false
        });
        this.props.updateAllowed(false);
      })
  }

  render() {
    if (this.props.isAllowed) {
      return <Redirect to="/y"/>
    }

    const {
      state: { isFetching, isError },
      submitHandler,
      changeHandler,
      cleanUp,
    } = this;

    return <Defender onSubmit={submitHandler}
                     onChange={changeHandler}
                     onCleanUp={cleanUp}
                     isFetching={isFetching}
                     isError={isError} />
  }
}

