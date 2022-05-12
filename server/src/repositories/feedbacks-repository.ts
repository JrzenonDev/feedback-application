export interface FeedbackCreateData {
  type: string
  comment: string
  Screenshot?: string
}

export interface FeecbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>
}

// contract