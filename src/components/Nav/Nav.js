import React, { Component } from 'react'
import { Container, FlexGrid, Link, Button, Logo } from 'components'
import s from './Nav.sass'

export default class Nav extends Component {
  dur = .3; ease = Cubic.easeOut;

  isWide = () => this.props.width >= 1870

  hide = () => {
    const { dur, ease } = this;
    if (this.isWide()) {
      return TweenMax.to(this.links, dur, {
        opacity: 0,
        ease
      })
    }

    TweenMax.to(this.wrapper, dur, {
      opacity: 0,
      ease
    })
  }
  show = () => {
    const { dur, ease } = this;
    if (this.isWide()) {
      return TweenMax.to(this.links, dur, {
        opacity: 1,
        ease
      })
    }

    TweenMax.to(this.wrapper, dur, {
      opacity: 1,
      ease
    })
  }

  trigger = props => {
    if ((props || this.props).hidden) {
      this.hide();
    } else {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden !== this.props.hidden) {
      this.trigger(nextProps);
    }
  }
  componentDidMount() {
    this.trigger();
  }

  getLinksRef = b => this.links = b;
  getNavRef = b => {
    this.wrapper = b;

    if (this.props.getRef) {
      this.props.getRef(b);
    }
  }

  render() {
    const { links } = this.props;
    return (
      <nav ref={this.getNavRef} className={s.nav}>
        <FlexGrid justify="space-between" align="center"
                  tag={Container} type="full" className={s.wrapper}>
          <Link to="/"><Logo /></Link>
          <div className={s.links}>
            <div ref={this.getLinksRef} className={s.links__wrapper}>
              {links.map(({to, content}, key) => (
                <Link regular className={s.item} to={to} key={key}>
                  {content}
                </Link>
              ))}
            </div>
            <Button to="/login" type="light"
                    className={s.button} rounded smallPadding>
              Войти
            </Button>
          </div>
        </FlexGrid>
      </nav>
    )
  }
}

