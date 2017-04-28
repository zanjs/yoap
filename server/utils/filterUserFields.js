export default item => {
  const {
    _id, name, phone,
    isDummy, isDeleted,
    visits, lastVisit,
    editedAt, createdAt,
    featured, objects,
    banned, verified, image
  } = item;

  return {
    _id, name, phone,
    isDummy, isDeleted,
    visits, lastVisit,
    editedAt, createdAt,
    featured, objects,
    banned, verified, image
  }
}
