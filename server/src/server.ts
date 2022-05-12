import express from 'express'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

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

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('HTTP server running teste!')
})