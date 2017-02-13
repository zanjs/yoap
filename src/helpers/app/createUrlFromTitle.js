export default (title) => {
  return title.toLowerCase().replace(new RegExp(' ', 'gi'), '-')
};
