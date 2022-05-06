import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Campo tipo é obrigatório");
    }

    if (!comment) {
      throw new Error("Campo comentário é obrigatório");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Formato de imagem inválido");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: `[${type}] Novo feedback`,
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<img src="${screenshot}" width="250px"/>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
