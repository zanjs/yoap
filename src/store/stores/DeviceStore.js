import { observable, action } from 'mobx'
import { extend, localStore } from 'helpers'
import { store as config } from 'constants'

class DeviceStore {
  // device support
  @observable support;

  // device sizes
  @observable windowWidth;
  @observable width;
  @observable height;
  @observable navHeight = 104;

  // scroll
  @observable scrollX;
  @observable scrollY;

  // device types
  @observable isMobile;
  @observable isTab;
  @observable isLaptop;
  @observable isDesktop;
  @observable isRetina;

  // browser types
  @observable isIE;

  doc = document.documentElement;

  constructor() {
    this.restoreValues(
      // if values not saved
      // we should initialize it
      this.init
    );


    this.subscribeToResizeEvent();
    this.subscribeToScrollEvent();
  }

  init = () => {
    this
      .checkSupport()
      .checkDeviceProps()
  };

  checkSupport = () => {
    let device = {};

    device.support = {
      touch: !!(("ontouchstart" in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),
      svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
    };

    device.support.localStorage = (function(){
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    })();

    return this.saveValues(device);
  };

  parseBrowserVersion = (cond, browser) => {
    if (!cond) return false;

    return parseInt((browser || this.browser).replace(/[a-z]/gi, ''));
  };

  checkDeviceProps = () => {
    let device = {};

    // Browser Agent
    device.agent = navigator.userAgent.toLowerCase();

    // App version
    device.appVersion = navigator.appVersion.toLowerCase();

    device.browser = (function(){
      let  ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }

      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();

    if (typeof device.browser === 'string') {
      device.browser = device.browser.toLowerCase();
    }

    // iOS
    if (navigator.userAgent.match(/iPad/i)) {
      device.isIPad = true;
    }
    if (navigator.userAgent.match(/(iPhone|iPod touch)/i)) {
      device.isIPhone = true;
    }
    if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
      device.isIOS = true;
    }
    if (navigator.userAgent.match(/.*CPU.*OS 7_\d/i)) {
      device.isIOS7 = true;
    }

    /* --- iPad (for fix wrong window height) --- */
    if (device.isIOS7 && device.isIPad) {
      window.addEventListener('resize orientationchange focusout', function(){
        window.scrollTo(0,0);
      });
    }

    // Firefox
    device.isFirefox = this.parseBrowserVersion(device.browser.indexOf('firefox') !== -1, device.browser);

    // Safari
    device.isSafari = this.parseBrowserVersion(device.browser.indexOf('safari') !== -1, device.browser);

    // Chrome
    device.isChrome = this.parseBrowserVersion(device.browser.indexOf('chrome') !== -1, device.browser);

    // IE
    device.isIE = this.parseBrowserVersion(device.browser.indexOf('ie') !== -1 || device.browser.indexOf('edge') !== -1, device.browser);

    // Opera
    device.isOpera = this.parseBrowserVersion(device.browser.indexOf('opera') !== -1, device.browser);

    // OS
    device.isMac = device.appVersion.indexOf("mac")!=-1;
    device.isWindows = device.appVersion.indexOf("win")!=-1;
    device.isUnix = device.appVersion.indexOf("x11")!=-1;
    device.isLinux = device.appVersion.indexOf("linux")!=-1;


    return this.saveValues(device);
  };

  checkDeviceResolution = (size) => {
    let device = {};

    // Mobile
    device.isMobile = this.support && this.support.touch && (size.windowWidth || this.windowWidth) < 767;

    // Tab
    device.isTab = this.support && this.support.touch && (size.windowWidth || this.windowWidth) < 1030;

    // Desktop
    device.isDesktop = (size.windowWidth || this.windowWidth) >= 1280;

    // Resolution
    device.isSmallScreen = (size.windowWidth || this.windowWidth) <= 767;

    // Android
    device.isAndroid = (() => {
      let match = this.agent && this.agent.match(/android\s([0-9\.]*)/);
      return match ? parseFloat(match[1]) : false;
    })();

    // Retina
    device.isRetina = (window.devicePixelRatio && window.devicePixelRatio>1);

    // Detect low mobile
    if(device.isMobile) {
      this.isLowEndMobile = (size.height || this.height) < 430 || this.isAndroid!==undefined && this.isAndroid!==null && this.isAndroid!==false && this.isAndroid<5;
    }

    return device;
  };

  saveValues = (data) => {
    // save to store
    extend(this, data);


    // save to localstorage
    let localData = localStore.get(config.device) || {};
    extend(localData, data);

    localStore.set(config.device, localData);

    return this;
  };

  resize = () => {
    const windowWidth = this.parseValue(window.innerWidth);
    const width = this.parseValue(document.documentElement.clientWidth);
    const height = this.parseValue(window.innerHeight);

    const size = {
      windowWidth,
      width,
      height
    };

    const device = this.checkDeviceResolution(size);

    this.saveValues({
      ...size, ...device
    });
  };

  parseValue = val => parseInt(val, 10);

  subscribeToResizeEvent = () => {
    this.resize();
    window.addEventListener('resize', this.resize)
  };

  getScrollPosition = () => {
    const doc = this.doc;
    this.scrollX = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    this.scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  };
  subscribeToScrollEvent = () => {
    this.getScrollPosition();
    window.addEventListener('scroll', this.getScrollPosition)
  };

  restoreValues = (cb) => {
    const data = localStore.get(config.device);

    if (data) {
      return extend(this, data);
    }

    return cb()
  }
}


export default new DeviceStore();
