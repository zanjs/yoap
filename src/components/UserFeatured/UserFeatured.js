import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { ItemPageInfoTitle, LinkIcon, FlexGrid } from 'components'
import { ItemTileContainer } from 'containers'
import s from './UserFeatured.sass'


const UserFeatured = ({data}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Избранное">
        {!!data.length && <LinkIcon gray to="/you/featured">
          {`Все избранные (${data.length})`}
        </LinkIcon>}
      </ItemPageInfoTitle>
      {data && <FlexGrid justify="start" align="start">
        {data.map((item, key) => (
          <ItemTileContainer key={key} data={item}/>
        ))}
      </FlexGrid>}
    </div>
  )
};

export default observer(UserFeatured);
