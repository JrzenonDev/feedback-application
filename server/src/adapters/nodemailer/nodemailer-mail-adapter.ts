import nodemailer from 'nodemailer'
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1f4a67778fa1c6",
    pass: "9e8e3990b24a36"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <suporte@feedget.com.br>',
      to: 'José Roberto <jrobertoonb@gmail.com>',
      subject: subject,
      html: body
    })
  }
}