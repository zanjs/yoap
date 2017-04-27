export default data => amount => {
  const string = amount + '';
  const last = parseInt(string[ string.length - 1 ], 10);

  if (last === 1) {
    return data[0] // 1 'товар'
  } else if (last >= 2 && last <= 4) {
    return data[1] // 2-3-4 'товара'
  } else {
    return data[2] // 5-6-7-8 'товаров'
  }
}
