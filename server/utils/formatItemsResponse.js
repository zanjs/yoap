import { termTypes } from 'constants/itemConstants/termTypes'
export default (data, termType = termTypes.types[2].id) => {
  let priceMin = 0;
  let priceMax = 0;
  let squaresMin = 0;
  let squaresMax = 0;

  data.forEach(item => {
    // get max-min price
    const price = item.price.find(it => it.id === termType);
    if (price && price.value) {
      const { value } = price;

      if (!priceMin || value < priceMin) {
        priceMin = value;
      }
      if (value > priceMax) {
        priceMax = value;
      }
    }

    const { squares } = item.size;
    if (squares) {
      if (!squaresMin || squares < squaresMin) {
        squaresMin = squares;
      }
      if (squares > squaresMax) {
        squaresMax = squares;
      }
    }
  });

  return {
    success: true,
    objects: data,
    price: [priceMin, priceMax],
    squares: [squaresMin, squaresMax]
  }
}
