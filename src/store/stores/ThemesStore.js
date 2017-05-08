import { observable, action } from 'mobx'
import {
  PINK_COLOR,
  BLACK_COLOR,
  WHITE_COLOR
} from 'constants'

class ThemesStore {
  @observable current = this.themes.white;
  @observable currentThemeName = 'white';

  @observable nav = {
    isCustomMainButton: false,
    mainButton: {
      to: '',
      content: ''
    },
    @observable links: null
  };

  @action changeNav = data => {
    return this.nav = {
      ...this.nav,
      ...data
    }
  };

  @action setTheme = name => {
    if (this.currentThemeName === name || !this.themes[name])
      return;

    this.currentThemeName = name;
    this.current = this.themes[name];
  };

  themes = {
    white: {
      fill: PINK_COLOR,
      color: BLACK_COLOR,
      backgroundColor: WHITE_COLOR
    },
    black: {
      fill: WHITE_COLOR,
      color: WHITE_COLOR,
      backgroundColor: BLACK_COLOR,
    }
  }
}

export default new ThemesStore;
