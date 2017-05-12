import { api } from 'constants/urls'

export const jwtSecret = 'YnNLpuWMpvmQXBDDy3EDUK'
export const images = {
  quality: 70,
  previewSize: 150,
};
export const domainName = 'http://yoap.co';
export const appDomainName = domainName;
export const verifyAccountLink = api + '/verify'
export const restorePasswordLink = api + '/restore'

export const routes = {
  verifyUser: '/verify/:token',
  restorePassword: '/restore/:restoreHash'
};
