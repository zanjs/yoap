import React from 'react'
import { Content } from 'components'
import { classNames } from 'helpers'
import s from './UserPhone.sass'


const UserPhone = ({phone, onClick, isError, className, isFetching}) => {
  const isHidden = !phone;
  const phoneClassName = classNames(
    s.phone,
    !isHidden && s.active,
    isFetching && s.fetch,
  );

  return (
    <div onClick={!isFetching && isHidden && onClick}
         className={classNames(s.wrapper, className)}>
      <Content nooffsets className={phoneClassName}
               tag={!isHidden && 'a'}
               href={!isHidden && `tel: ${phone.replace(/ /gi, '')}`}
               gray={isHidden}>
        {isFetching ? 'Загрузка' : (phone || 'Показать телефон')}
      </Content>
      {isError && <Content className={s.error}>{isError}</Content>}
    </div>
  )
};

export default UserPhone;

