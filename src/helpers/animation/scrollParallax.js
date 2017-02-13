import { loop } from 'helpers'

export default (scrollY, blocks, params) => {
  const { dur, ease, fixer } = params;
  //const { height } = params;

  loop(blocks, (item, index) => {
    if (!item.block) return;
    const y = scrollY / ((index + 1) * 2); //(item.scrollY + (pageY * item.speedY)) * fixer;

    TweenMax.to(item.block, dur, {
      y, ease
    });

    item.scrollY = y;
  });
}
