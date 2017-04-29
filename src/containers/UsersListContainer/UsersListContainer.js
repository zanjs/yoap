import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UsersList } from 'components'

const mapStateToProps = ({users}) => ({
  isFetching: users.isFetching,
  isError: users.isError,
  dummies: users.dummies,
  users: users.users,
  fetchUsers: users.fetchUsers,
  createUser: users.createUser,
  updateUser: users.updateUser
})

@inject(mapStateToProps) @observer
export default class UsersListContainer extends Component {
  state = {isEdit: false, user: {}};
  componentWillMount() {
    this.props.fetchUsers();
  }

  clickHandler = () => {
    if (!this.state.isEdit) {
      this.setState({isEdit: true});
    }
  }
  changeHandler = ({target}) => {
    if (!target) {
      return null;
    }

    this.setState(({user}) => ({
      user: {
        ...user,
        [target.name]: target.value
      }
    }))
  }
  cancelHandler = () => {
    this.setState({
      isEdit: false,
      user: {}
    })
  }
  submitHandler = () => {
    console.log('CREATE USER', this.state.user);
    this.props.createUser(this.state.user, () => {
      // todo: print message
      this.setState({user: {}, isEdit: false});
      console.log('user was created successfully!');
    })
  }
  rowClickHandler = e => {
    e.preventDefault();

    const { target } = e;
    const block = target.closest('[data-index]')
    console.log(
      'clicked by left button',
      parseInt(block.getAttribute('data-index'), 10)
    )

    return false;
  }
  toggleBan = (index, cb) => {
    const user = this.props.dummies[index];
    const userId = (user.id || user._id);
    const data = {
      banned: !user.banned
    };

    return this.props.updateUser(userId, data, cb);
  };
  rowContextHandler = (e) => {
    e.preventDefault();
    const { target } = e;
    const block = target.closest('[data-index]')
    const index = parseInt(block.getAttribute('data-index'), 10);

    if (index == null)
      return false;

    this.toggleBan(index, () => {
      console.log("USER WAS SUCCESSFULLY BANNED!");
    })


    return false;
  }


  render() {
    // onClick, onChange, onSubmit, onCancel
    const { isFetching, isError, users, dummies } = this.props;
    const { isEdit, user } = this.state;
    const {
      clickHandler, submitHandler, cancelHandler,
      changeHandler, rowClickHandler, rowContextHandler
    } = this;

    return <UsersList onHeadClick={clickHandler}
                      onRowClick={rowClickHandler}
                      onRowContext={rowContextHandler}
                      onChange={changeHandler}
                      onCancel={cancelHandler}
                      onSubmit={submitHandler}
                      isFetching={isFetching}
                      isError={isError}
                      newUser={user}
                      edit={isEdit}
                      data={dummies}/>
  }
}

