import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yoap.co@gmail.com',
    pass: 'yoapUC9yan4n'
  }
});

const getOptions = ({to, subject, text, html}) => ({
  from: 'YOAP <notify@yoap.co>', // sender address
  to, subject,
  text, html
})

export default options => {
  transporter.sendMail(getOptions(options), (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
