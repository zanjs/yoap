export default node => {
  if (typeof window === 'undefined') {
    return {top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0}
  }

  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = node.getBoundingClientRect();

  const top = elemRect.top - bodyRect.top;
  const left = elemRect.left - bodyRect.left;
  const height = elemRect.height;
  const width = elemRect.width;
  const bottom = top + height;
  const right = elemRect.right - bodyRect.right;

  return {
    top, left, bottom,
    right, height, width
  }
};
