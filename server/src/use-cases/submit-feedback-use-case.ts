import { FeecbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  Screenshot?: string
}

export class SubmitFeedbackUseCase {
  private feedbacksRepository: FeecbacksRepository

  constructor(
    feedbacksRespository: FeecbacksRepository
  ) {
    this.feedbacksRepository = feedbacksRespository
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, Screenshot } = request

    await this.feedbacksRepository.create({
      type,
      comment,
      Screenshot
    })
  }
}