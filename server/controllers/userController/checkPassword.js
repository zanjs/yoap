export default (req, res) => {
  const { password } = req.body;

  if (password === 'aezakmi') {
    return res.status(200).json({
      message: 'Пароль подходит!'
    })
  }

  return res.status(401).json({
    message: 'Вы ввели неправильный пароль!'
  })
}
