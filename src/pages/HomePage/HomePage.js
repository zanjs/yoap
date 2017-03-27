import React, { Component } from 'react'
import {
  Intro, BannerThreeCols, BannerTwoCols,
  PricingBanner, PricingBannerFull
} from 'components'
import {
  ItemTilesBannerContainer, MapItemsContainer
} from 'containers'
import s from './HomePage.sass'

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

export default class HomePage extends Component {
  render() {
    return (
      <div className={s.homepage}>
        <Intro />
        <MapItemsContainer />
        <ItemTilesBannerContainer />
        <PricingBanner />
        <PricingBannerFull />
        <BannerThreeCols content={bannerThreeColsContent}
                         title="Услуги"/>
        <BannerTwoCols />
      </div>
    )
  }
}

