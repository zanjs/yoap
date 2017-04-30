import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  ItemPageInfoTitle, LinkIcon, FlexGrid,
  Svg, Content
} from 'components'
import { ItemTileContainer } from 'containers'
import { classNames } from 'helpers'
import s from './UserFeatured.sass'

import favoriteIcon from 'icons/ui/favlorite-bg.svg'

const UserFeatured = ({data}) => {
  const isEmpty = !data || !data.length;

  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Избранное">
        {!isEmpty && <LinkIcon gray to="/you/featured">
          {`Все избранные (${data.length})`}
        </LinkIcon>}
      </ItemPageInfoTitle>
      {isEmpty &&
      <FlexGrid justify="center"
                direction="column"
                align="center">
        <Svg className={classNames(s.icon)}
             src={favoriteIcon} />
        <Content regular nooffsets gray className={s.text}>
          Добавляйте в избранное объявления, <br/>чтобы вернуться к ним  и выбрать лучшее
        </Content>
      </FlexGrid>}
      {!isEmpty && <FlexGrid justify="start" align="start">
        {data.map((item, key) => (
          <ItemTileContainer key={key} data={item}/>
        ))}
      </FlexGrid>}
    </div>
  )
};

export default observer(UserFeatured);
