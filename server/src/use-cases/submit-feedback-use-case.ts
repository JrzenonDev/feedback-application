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
        `</div>`
      ].join('\n')
    })
  }
}