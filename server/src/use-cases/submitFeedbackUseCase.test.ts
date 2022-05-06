import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("Deveria ser possível enviar um feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Feedback exemplo",
        screenshot: "data:image/png;base64,teste",
      })
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("Não deveria ser possível enviar um feedback sem tipo", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Feedback exemplo",
        screenshot: "data:image/png;base64,teste",
      })
    ).rejects.toThrow();
  });

  it("Não deveria ser possível enviar um feedback sem comentário", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,teste",
      })
    ).rejects.toThrow();
  });

  it("Não deveria ser possível enviar um feedback com screenshot invalido", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Feedback exemplo",
        screenshot: "teste.png",
      })
    ).rejects.toThrow();
  });
});
