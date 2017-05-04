import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { shallowEqual } from 'helpers'

@observer
class LazyItem extends Component {
  state = { isHidden: true };
  isFaded = false;
  isMount = false;

  componentWillMount() {
    this.isMount = true;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('scroll', this.scrollHandler);
    this.isMount = false;
  }

  componentDidMount() {
    this.resize();
    this.scrollHandler();
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.scrollHandler);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isHidden !== nextState.isHidden
  }

  // componentWillReceiveProps(nextProps) {
  //   this.update(nextProps);
  // }

  update = (scrollY, y) => {
    if (this.isFaded)
      return null;

    if (scrollY >= y) {
      this.isFaded = true;
      return this.setState({isHidden: false})
    }
  }

  scrollHandler = () => {
    if (this.isFaded)
      return null;

    const doc = document.documentElement;
    this.scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    this.scrollY += parseInt(window.innerHeight, 10) * 1.7

    this.update(this.scrollY, this.y);
  }
  resize = () => {
    if (!this.isMount)
      return;
    const pos = this.wrapper.getBoundingClientRect();
    this.y = pos.top;
  }
  getRef = b => this.wrapper = b;

  render() {
    const { children, className } = this.props;

    if (this.state.isHidden) {
      return <span className={className} ref={this.getRef}/>
    }

    return children;
  }
}

@observer
export default class LazyRender extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps.data, this.props.data);
  }
  render() {
    const { data, wrapperClassName, className } = this.props;
    return (
      <div className={wrapperClassName}>
        {data.map((item, key) => (
          <LazyItem className={className} key={key}>{item}</LazyItem>
        ))}
      </div>
    )
  }
}

