import { sendEmail } from 'utils'
import { domainName, appDomainName, verifyAccountLink } from 'serverConfig'

export default ({id, email, name}) => {
  const link = `${domainName}${verifyAccountLink}/${id}`;
  sendEmail({
    to: email,
    subject: 'Подтвердите ваш аккаунт YOAP',
    text: 'Вставьте ссылку в строку браузера для подтверждения аккаунта -> ' + link,
    html: `
      <h1>Здравствуйте, ${name}!</h1>
      <p>Перейдите по ссылке для подтверждения вашего аккаунта на <a href="${appDomainName}" target="_blank">YOAP</a>.</p>
      <a href="${link}">Подтвердить аккаунт</a>
    `
  })
}
