const gallery = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(index => require(`./${index}.jpg`));

export default {
  thumbnail: {
    preview: require('./preview-min.jpg'),
    full: require('./preview.jpg')
  },
  gallery
}
