export default function userModeratorValidation({req, res, _creator, objectId}) {
  const userId = (req.user.id || req.user._id);
  const isAdmin = req.user.isAdmin;

  if (!isAdmin && objectId) {
    const isExist = req.user.objects.find(objId =>
      objId.toString() === objectId.toString()
    );

    if (!isExist) {
      return res.status(401).json({
        message: 'У вас нет прав редактировать это объявление.'
      })
    }
  } else if (!isAdmin && _creator !== userId) {
    return res.status(401).json({
      message: 'У вас нет прав редактировать чужие объявления.'
    })
  }

  return false;
}
