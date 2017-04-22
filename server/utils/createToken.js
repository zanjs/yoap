import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'

export default function createToken(user) {
  return jwt.sign({
    id: user._id || user.id,
    phone: user.phone,
    name: user.name,
    isAdmin: user.isAdmin,
    image: user.image,
    banned: user.banned || false,
    verified: user.verified,
    lastVisit: user.lastVisit,
    createdAt: user.createdAt,
    editedAt: user.editedAt,
    visits: user.visits,
    isDeleted: user.isDeleted,

    objects: user.objects,
    featured: user.featured
  }, jwtSecret);
}
