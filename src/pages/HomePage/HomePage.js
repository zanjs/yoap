import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  Intro,
  BannerThreeCols, Checkout,
  PricingBanner, PricingBannerFull,
  ItemTilesBanner, MapItems, LoadingAnimation
} from 'components'
import s from './HomePage.sass'

const des =
  'Мы тщательно отбираем и проверяем все объекты, представленные на нашем сайте. ' +
  'Вы можете быть уверены, что данные квартиры соответствуют своему описанию, ' +
  'и документы, представленные реальными владельцами прошли верификацию.';

const bannerThreeColsContent = [
  {
    title: 'Осмотр',
    content: 'Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив свой завтрак жидким чаем, я догонял трамвай.'
  },
  {
    title: 'Проверка',
    content: 'Чтобы добавить еще одну вишенку к темной людской грозди, свисавшей с подножки, и плыл сквозь акварельный розово-голубой город к конуре-проходной.'
  },
  {
    title: 'Верификация',
    content: 'Там два вахтера проверяли наши пропуска, а фасад был украшен классическими фанерными пилястрами.'
  }
];
const mapStateToProps = ({items: {isFetching}, user}) => ({
  isFetching: isFetching || user.isFetching
});

@inject(mapStateToProps) @observer
export default class HomePage extends Component {
  render() {
    const { isFetching } = this.props;

    return (
      <div className={s.homepage}>
        <Helmet>
          <title>Лучшие объявления по аренде жилья без комиссии</title>
          <meta name="description" content={des} />
        </Helmet>

        <Intro />
        <Checkout/>
        {/*<Payment/>*/}
        <MapItems />
        <ItemTilesBanner />
        <PricingBanner />
        <PricingBannerFull />
        <BannerThreeCols content={bannerThreeColsContent}
                         title="Услуги"/>
        {/*<BannerTwoCols />*/}
        {isFetching && <LoadingAnimation />}
      </div>
    )
  }
}

