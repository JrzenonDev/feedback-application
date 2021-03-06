import { MailAdapter } from "../adapters/mail-adapter"
import { FeecbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  Screenshot?: string
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeecbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, Screenshot } = request

    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (Screenshot && !Screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      Screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body:  [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        Screenshot ? `<img style="width: 450px;" src="${Screenshot}" />` : ``,
        `</div>`
      ].join('\n')
    })
  }
}