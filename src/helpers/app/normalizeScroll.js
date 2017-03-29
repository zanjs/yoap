import bindWheel from './bindWheel'
const { body } = document;
const { scrollTo } = window;
const doc = document.documentElement;

const bind = () =>
  bindWheel.on(body, onWheel);

const unbind = () =>
  bindWheel.off(body, onWheel);

function onWheel(e = window.event) {
  // wheelDelta не дает возможность узнать количество пикселей
  const delta = e.deltaY || e.detail || e.wheelDelta;
  const y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  scrollTo(0, delta + y);

  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  return false;
}

export default cond => {
  if (cond) {
    return bind();
  }

  return unbind();
}
