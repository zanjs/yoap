const doc = typeof window !== 'undefined' && document.documentElement || null;

let scrollY = 0;

export default wViewport => {
  if (!doc)
    return scrollY;

  const scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  return wViewport ? scrollY + parseInt(window.innerHeight, 10) : scrollY;
}
