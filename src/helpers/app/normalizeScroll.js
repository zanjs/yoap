const { body } = document;
const { scrollTo } = window;
const doc = document.documentElement;

const bind = () => {
  if (body.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      body.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      body.addEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      body.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    body.attachEvent("onmousewheel", onWheel);
  }
};

const unbind = () => {
  if (body.removeEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      body.removeEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      body.removeEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      body.removeEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    body.detachEvent("onmousewheel", onWheel);
  }
};

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
