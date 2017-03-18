export const fakeApiTimeout = 6000;
export const ___PW = 'us--exp';

export const divider = '-';
export const splitter = '@';








// ========================================================### DEVICE BREAKPOINTS ###
export const devicesBreakpoints = {
  mobile: 992,
  tablet: 1030,
  laptop: 1380,
  desktop: 2000,
  retina: 9999
};
export const devices = {
  inStore: '__SIZE_DATA__'
};

// ========================================================### BASIC ANIMATION PARAMETERS ###
// default duration for whole animations
export const dur = .3;
export const minDur = .15;
export const midDur = .5;
export const bigDur = .65;

// easing configurations in function
// for server-side render reasons
export const ease = {
  in: () => Cubic.easeIn,
  out: () => Cubic.easeOut,
  inOut: () => Cubic.easeInOut,
  easeNone: () => Linear.easeNone
};


// ========================================================### INTRO SLIDER CONFIG ###
export const introSlider = {
  // remember that animationDuration will be multiplied by 2,
  // because we have to hide and show slide.
  animationDuration: .9,
  get slidesDuration() {
    return 10 + (this.animationDuration * 2)
  },

  elementsGap: 300,
  contentGap: 100,

  easeIn: ease.in,
  easeOut: ease.out
};

// ========================================================### NAVIGATION CONFIG ###
export const navigation = {
  overlayOpacity: .85,
  duration: dur,
  ease: ease.out,
  gap: 30
};


// ========================================================### MOBILE NAVIGATION CONFIG ###
const navMobileDuration = bigDur;
const navMobileWrapperDelay = navMobileDuration / 3;
export const navMobile = {
  duration: navMobileDuration,
  contentGap: '30%',
  menuWrapperGap: '70%',
  menuWrapperEase: ease.out,
  menuWrapperDelay: navMobileWrapperDelay,
  menuWrapperDuration: (navMobileDuration - navMobileWrapperDelay),
  menuGap: '-100%',
  easeIn: ease.inOut,
  easeOut: ease.out
};


// ========================================================### CART CONFIG ###
export const cart = {
  duration: bigDur,
  easeIn: ease.inOut,
  easeOut: ease.out,

  inStore: '__CART_DATA__'
};

// ========================================================### PRELOADER CONFIG ###
export const preloader = {
  spinDuration: bigDur,
  fadeDuration: dur,
  easeIn: ease.inOut,
  easeOut: ease.out,
  easeSpin: ease.inOut
};

// ========================================================### IMAGE COMPONENT CONFIG ###
export const image = {
  dur: bigDur,
  ease: ease.out,
  delay: 0.1,
  blur_radius: 20
};


// AboutPage Header & ContactPage Header config
export const MobileHeaderRatio = .4;
export const DesktopHeaderRatio = .2;


// ========================================================### TITLES OF PAGES ###
export const pagesTitles = {
  TodosPage: 'Todos',
  InfoPage: 'Application Info',
  BoardPage: 'The Board',
  LoginPage: 'Login',
  SignupPage: 'Sign Up',
  UserPage: 'You',

  ProtectPage: 'Гарантии',
  DeliveryPage: 'Доставка и оплата',
  ContactPage: 'Контакты',
  CatalogPage: 'Каталог гаджетов',
  AdminPage: 'Панель администратора'
};


// ========================================================### FORMS VALIDATION MESSAGES ###
export const userValidation = {
  email: {
    empty: 'Пожалуйста, введите Вашу почту.',
    wrong: 'Неправильный формат вводимых данных. \nПожалуйста, введите почту.',
    success: 'Почта подходит.'
  },
  password: {
    empty: 'Пожалуйста, введите пароль.',
    wrong: 'Ваш пароль очень короткий. \nВведите, пожалуйста, больше 4-ех символов.',
    normal: 'Ваш пароль длиной меньше 8-ми. \nЭто нормально, но больше - лучше.',
    success: 'Отличный пароль!'
  },
  name: {
    empty: 'Пожалуйста, введите Ваше имя.',
    wrong: 'Произошла неизвестная ошибка.',
    normal: 'Интересное имя в 2 символа. \nВы уверены, что это ваше имя?',
    success: 'Отличное имя!'
  },
  phone: {
    empty: 'Пожалуйста, введите Ваш телефон. \nОн необходим нам для подтверждения заказа.',
    wrong: 'Неверный формат вводимых данных. Пожалуйста, введите номер телефона.',
    NaN: 'Вы ввели не цифры.',
    short: 'Введеный номер телефона слишком короткий.',
    success: 'Номер что надо!'
  },
  message: {
    empty: 'Вы уверены, что не хотите ничего добавить?',
    success: 'Хорошо, постараемся учесть!'
  }
};


// ========================================================### USER CONFIG ###
export const user = {
  nameMaxLength: 20
};




