const body = document.body;
const setBodySize = () =>
  document.body.style.width =
    parseInt(document.documentElement.clientWidth, 10) + 'px';

const resize = () => {
  setBodySize();
};

const blockScroll = cb => {
  window.addEventListener('resize', resize);
  setBodySize();

  body.style.overflowY = 'hidden';
  body.style.marginRight = 'auto';
  body.style.position = 'relative';

  if (cb) {
    cb(true);
  }
};
const unBlockScroll = cb => {
  window.removeEventListener('resize', resize);

  body.style.overflowY = 'visible';
  body.style.width = '100%';
  body.style.position = 'static';

  if (cb) {
    cb(false);
  }
};

export default (mode, cb) => {
  if (mode) {
    blockScroll(cb)
  } else {
    unBlockScroll(cb)
  }
};
