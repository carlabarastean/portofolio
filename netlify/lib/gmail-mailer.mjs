import nodemailer from 'nodemailer'

export const sendGmailMessage = async ({
  gmailUser,
  gmailAppPassword,
  fromName,
  to,
  replyTo,
  subject,
  html,
  text,
  attachments = [],
  messageId,
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword.replaceAll(' ', ''),
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  return transporter.sendMail({
    from: `"${fromName}" <${gmailUser}>`,
    to,
    replyTo,
    subject,
    html,
    text,
    attachments,
    messageId,
  })
}
