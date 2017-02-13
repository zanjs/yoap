import { loop } from 'helpers'

export default (e, blocks, params) => {
  const { dur, ease, fixer } = params;
  const { width, height } = params;
  const pageX = e.clientX - (width / 2);
  const pageY = e.clientY - (height / 2);

  loop(blocks, (item) => {
    if (!item.block) return;

    const x = (item.x + (pageX * item.speedX)) * fixer;
    const y = (item.y + (pageY * item.speedY)) * fixer;


    TweenMax.to(item.block, dur, {
      x, y, ease
    });

    item.x = x;
    item.y = y;
  });
}
