export default data => {
  return data.map(item => {
    const { location } = item.location;
    const position = [location[0], location[1]];

    return {
      position,
      props: {
        data: item
      }
    }
  })
}
