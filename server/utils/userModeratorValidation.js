export default function userModeratorValidation({req, res, _creator, objectId, noRes}) {
  const userId = (req.user.id || req.user._id);
  const isAdmin = req.user.isAdmin;

  if (!isAdmin && objectId) {
    const isExist = req.user.objects.find(objId =>
      objId.toString() === objectId.toString()
    );

    if (!isExist) {
      !noRes && res.status(401).json({
        message: 'У вас нет прав редактировать это объявление.'
      })
      return false;
    }

    return true;
  } else if (!isAdmin && _creator !== userId) {
    !noRes && res.status(401).json({
      message: 'У вас нет прав редактировать чужие объявления.'
    })
    return false;
  } else if (isAdmin) {
    return true;
  }

  return true;
}
