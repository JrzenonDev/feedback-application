import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1f4a67778fa1c6",
    pass: "9e8e3990b24a36"
  }
})

app.post('/feedbacks', async (req, res) => {

  // destructuring
  const { type, comment, Screenshot } =  req.body

  const feedback = await prisma.feedback.create({
    data: {
      type: type,
      comment: comment,
      Screenshot: Screenshot
    }
  })

  transport.sendMail({
    from: 'Equipe Feedget <suporte@feedget.com.br>',
    to: 'José Roberto <jrobertoonb@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('HTTP server running teste!')
})