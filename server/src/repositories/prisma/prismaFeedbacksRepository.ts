import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: data.type,
        comment: data.comment,
        screenshot: data.screenshot,
      },
    });
  }
}
