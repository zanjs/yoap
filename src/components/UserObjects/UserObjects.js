import React from 'react'
import { observer } from 'mobx-react'
import { Link as RouterLink } from 'react-router-dom'
import { ItemPageInfoTitle, LinkIcon, Svg, Content, FlexGrid } from 'components'
import { ItemTileContainer } from 'containers'
import { classNames } from 'helpers'
import s from './UserObjects.sass'

import addIcon from 'icons/ui/add.svg'
import notAvailableIcon from 'icons/ui/not_available.svg'

const UserFeatured = ({data, notAllowed, newObject}) => {
  const isEmpty = !data || !data.length || !data[0];
  const object =  !isEmpty && data[0];

  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Мои объявления">
        {!!data.length && <LinkIcon gray to="/you/yours">
          {`Все объявления (${data.length})`}
        </LinkIcon>}
      </ItemPageInfoTitle>
      <FlexGrid className={s.items__wrapper} justify="start"
                align="start" wrap="false">
        {!isEmpty && <ItemTileContainer edit data={object}/>}
        {notAllowed &&
        <div className={classNames(s.icon__wrapper, s.icon__wrapper_full)}>
          <Svg className={classNames(s.icon, s.icon_null)}
               src={notAvailableIcon} />
          <Content regular nooffsets gray className={s.text}>
            Для добавления необходимо <br/>подтвердить аккаунт по e-mail.
          </Content>
        </div>}

        {!notAllowed && isEmpty &&
        <RouterLink to={newObject || "/manage/create"}
                    className={classNames(s.icon__wrapper, s.icon__wrapper_full)}>
          <Svg className={classNames(s.add, s.icon_null)}
               src={addIcon} />
          <Content regular nooffsets gray className={s.text}>
            Добавьте первое объявление
          </Content>
        </RouterLink>}

        {!notAllowed && !isEmpty && <RouterLink to={newObject || "/manage/create"}>
          <Svg className={classNames(s.add)}
               src={addIcon} />
        </RouterLink>}
      </FlexGrid>
    </div>
  )
};

export default observer(UserFeatured);


