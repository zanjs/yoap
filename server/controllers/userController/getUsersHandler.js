import getUsers from './getUsers'

export default (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: 'У вас недостаточно прав, чтобы получить данные пользователей.'
    })
  }

  getUsers().then(data => {
    return res.status(200).json({
      success: true,
      data
    })
  }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
}
