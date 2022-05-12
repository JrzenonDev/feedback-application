import { prisma } from "../../prisma";
import { FeecbacksRepository, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeecbacksRepository {
  async create({ type, comment, Screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: type,
        comment: comment,
        Screenshot: Screenshot
      }
    })
  }
}