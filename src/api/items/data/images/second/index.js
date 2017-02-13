const gallery = [1,2,3,4,5,6,7,8,9,10,11].map(index => require(`./${index}.jpg`));

export default {
  thumbnail: {
    preview: require('./preview-min.jpg'),
    full: require('./preview.jpg')
  },
  gallery
}
