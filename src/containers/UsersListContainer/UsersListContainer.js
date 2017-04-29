import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { UsersList } from 'components'
import { shallowEqual } from 'helpers'

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
  index;

  componentWillMount() {
    this.props.fetchUsers();
  }

  getIndex = block => {
    const parent = block.closest('[data-index]');

    if (parent) {
      return parseInt(parent.getAttribute('data-index'), 10)
    }
    return null;
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
  getChangedData = data => {
    const { index } = this;

    if (index == null) {
      return {data, isUpdate: false};
    }

    let newData = {};
    let origin = this.props.dummies[index];
    for (let prop in data) {
      const value = data[prop];
      if (!shallowEqual(origin[prop], value)) {
        newData[prop] = value;
      }
    }

    this.index = null;
    return {
      id: origin.id || origin._id,
      data: newData,
      isUpdate: true
    }
  }
  submitHandler = () => {
    const editedData = this.getChangedData(this.state.user);

    if (editedData.isUpdate) {
      return this.props.updateUser(editedData.id, editedData.data, () => {
        this.setState({user: {}, isEdit: false});
        console.log('user was updated successfully!');
      })
    }

    this.props.createUser(editedData.data, () => {
      // todo: print message
      this.setState({user: {}, isEdit: false});
      console.log('user was created successfully!');
    })
  }
  rowClickHandler = e => {
    e.preventDefault();

    const { target } = e;
    const index = this.getIndex(target);

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
    const index = this.getIndex(target);

    if (index == null)
      return false;

    this.toggleBan(index, () => {
      console.log("USER WAS SUCCESSFULLY BANNED!");
    })


    return false;
  }

  editHandler = e => {
    e.preventDefault();
    const { target } = e;
    const index = this.getIndex(target);

    if (index == null)
      return false;

    this.index = index;
    this.setState({
      user: this.props.dummies[index],
      isEdit: true
    })

    return false;
  }


  render() {
    // onClick, onChange, onSubmit, onCancel
    const { isFetching, isError, users, dummies } = this.props;
    const { isEdit, user } = this.state;
    const {
      clickHandler, submitHandler, cancelHandler,
      changeHandler, rowClickHandler, rowContextHandler,
      editHandler
    } = this;

    return <UsersList onHeadClick={clickHandler}
                      onRowClick={rowClickHandler}
                      onRowContext={rowContextHandler}
                      onChange={changeHandler}
                      onCancel={cancelHandler}
                      onSubmit={submitHandler}
                      onEditClick={editHandler}
                      isFetching={isFetching}
                      isError={isError}
                      newUser={user}
                      edit={isEdit}
                      data={dummies}/>
  }
}

