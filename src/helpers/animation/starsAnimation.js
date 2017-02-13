import { bigDur, ease as easeConfig } from '../../config'
import { loop, randomNumber, shuffleArray } from 'helpers'

const dur = bigDur;
const delay = dur / 10;
const ease = easeConfig.in();


const getRandomTransform = () => {
  return randomNumber(0, 100) + '%';
};


const Tween = (block, opacity, x, y) => {
  let from = {};
  let to = {};
  if (opacity) {
    from = {
      opacity: 0,
      x, y
    };
    to = {
      opacity: 1
    };
  } else {
    from = {
      opacity: 1
    };
    to = {
      opacity: 0
    };
  }

  to.ease = ease;

  TweenMax.fromTo(block, dur, from, to);
};

const animation = (blocks) => {
  const newBlocks = shuffleArray(blocks);

  loop(newBlocks, (block, index) => {
    if (!block) return;
    let opacity = 1;
    const x = getRandomTransform();
    const y = getRandomTransform();

    if (block.style.opacity == 1) {
      opacity = 0;
    }


    setTimeout(() => {
      if (!block) return;
      Tween(block, opacity, x, y);
    }, index * (delay) * 1000);
  });
};

const createAnimation = (block, selector) => {
  const blocks = [...block.querySelectorAll(selector)];

  animation(blocks);
  return setInterval(() => animation(blocks), (dur + (delay * blocks.length))  * 1000);
};


export default (block, selector) => {
  if (typeof block === 'number') {
    return clearInterval(block);
  }

  if (!block) {
    return 0;
  }

  return createAnimation(block, selector);
}
