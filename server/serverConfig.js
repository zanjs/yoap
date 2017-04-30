import { api } from 'constants/urls'

export const jwtSecret = 'YnNLpuWMpvmQXBDDy3EDUK'
export const images = {
  quality: 70,
  previewSize: 150,
};
export const sortConfig = {editedAt: -1, rating: -1};
export const domainName = 'http://yoap.co';
export const appDomainName = domainName;
export const verifyAccountLink = api + '/verify'

export const routes = {
  verifyUser: '/verify/:token'
};
