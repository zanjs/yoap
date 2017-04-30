import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  Container, FlexGrid,
  UserCustomAddress, UserObjects,
  UserFeatured, UserSubscription,
  LoadingAnimation
} from 'components'
import { UserDataEditContainer } from 'containers'
import { isEmpty } from 'helpers'
import s from './UsersPage.sass'

const mapStateToProps = ({users, user, items}) => {
  const { updateCurrent, find, fetchUsers, current } = users;
  const {
    fetchUserItems, fetchUserFeatured,
  } = items;

  return {
    updateCurrent, fetchUsers,
    fetchUserItems, fetchUserFeatured,
    data: items.users,
    featured: items.featured,
    findUser: find,
    isAuthorized: user.isAuthorized,
    isAdmin: user.isAdmin,
    user: current
  }
}

@inject(mapStateToProps) @observer
export default class UsersPage extends Component {
  setUser = id => {
    const user = this.props.findUser(it => (it.id || it._id) === id);
    this.props.updateCurrent(user);
    return user;
  };
  update = () => {
    const { id } = this.props.match.params;
    if (isEmpty(id))
      return;

    this.setUser(id);
    this.props.fetchUsers(() => {
      const user = this.setUser(id);
      console.log(user);
      this.props.updateCurrent(user);
      this.props.fetchUserItems(user.objects);
      this.props.fetchUserFeatured(user.featured);
    })
  }
  componentWillMount() {
    this.update();
  }

  render() {
    const {
      data, featured, isFetching,
      isAuthorized, isAdmin, user,
      match: {params: {id}}
    } = this.props;

    if (!isAuthorized || !isAdmin) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        {isFetching && <LoadingAnimation />}

        <Container className={s.content}>
          <FlexGrid justify="space-between" align="start">

            <div className={s.info}>
              <UserDataEditContainer noEdit data={user} />
              <UserCustomAddress />
              <UserSubscription />
            </div>

            <div className={s.data}>
              <UserObjects newObject={`/they/manage/${id}/create`} data={data}/>
              <UserFeatured data={featured}/>
            </div>
          </FlexGrid>
        </Container>
      </div>
    )
  }
}

