import { api } from 'constants/urls'

export const jwtSecret = 'YnNLpuWMpvmQXBDDy3EDUK'
export const images = {
  quality: 70,
  previewSize: 150,
};
export const sortConfig = {editedAt: -1, rating: -1};
export const domainName = 'http://localhost:5000';
export const appDomainName = 'http://localhost:8080';
export const verifyAccountLink = api + '/verify'

export const routes = {
  verifyUser: '/verify/:token'
};
