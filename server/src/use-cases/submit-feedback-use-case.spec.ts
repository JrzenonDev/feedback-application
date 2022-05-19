import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {

  const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
  )

  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      Screenshot: 'data:image/png;base64,dsadasdasdasdasdas'
    })).resolves.not.toThrow()
  })

  it('should not be able to submit feedback whitout type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      Screenshot: 'data:image/png;base64,dsadasdasdasdasdas'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback whitout comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      Screenshot: 'data:image/png;base64,dsadasdasdasdasdas'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback with an screenshot invalid.', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'está tudo bugado',
      Screenshot: 'dsadasd7'
    })).rejects.toThrow()
  })

})