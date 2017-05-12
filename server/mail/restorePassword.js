import { sendEmail } from 'utils'
import { domainName, appDomainName, restorePasswordLink } from 'serverConfig'

export default ({restoreHash, email, name}) => {
  const link = `${domainName}${restorePasswordLink}/${restoreHash}`;
  sendEmail({
    to: email,
    subject: 'Восстановление аккаунта YOAP',
    text: 'Вставьте ссылку в строку браузера восстановления пароля -> ' + link,
    html: `
      <h1>Здравствуйте, ${name}!</h1>
      <p>Перейдите по ссылке и выполните дальнейшие инструкции по восстановлению пароля <a href="${appDomainName}" target="_blank">YOAP</a>.</p>
      <a href="${link}">Восстановить аккаунт</a>
    `
  })
}
