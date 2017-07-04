export default res => {
  if (res.status >= 200 && res.status <= 302) {
    return res
  } else {
    const error = new Error(res);
    error.response = res;
    throw error
  }
}
