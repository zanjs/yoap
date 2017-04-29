import React from 'react'
import { observer } from 'mobx-react'
import { Link as RouterLink } from 'react-router-dom'
import { ItemPageInfoTitle, LinkIcon, Svg, FlexGrid } from 'components'
import { ItemTileContainer } from 'containers'
import { classNames } from 'helpers'
import s from './UserObjects.sass'

import addIcon from 'icons/ui/add.svg'

const UserFeatured = ({data, newObject}) => {
  const object = data && data.length && data[0] || null;
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Мои объявления">
        {!!data.length && <LinkIcon gray to="/you/yours">
          {`Все объявления (${data.length})`}
        </LinkIcon>}
      </ItemPageInfoTitle>
      <FlexGrid className={s.items__wrapper} justify="start"
                align="start" wrap="false">
        {object && <ItemTileContainer edit data={object}/>}
        <RouterLink to={newObject || "/manage/create"}>
          <Svg className={classNames(s.add, !!object && s.add_last)}
               src={addIcon} />
        </RouterLink>
      </FlexGrid>
    </div>
  )
};

export default observer(UserFeatured);


