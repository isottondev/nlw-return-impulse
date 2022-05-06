import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5afd5c45f1e93e",
    pass: "06816f9a5b2b15",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    await transport.sendMail({
      from: "Equipe feedget <suporte@isodev.com.br>",
      to: "Gabriel Isotton <gabriel@isodev.com.br>",
      subject: data.subject,
      html: data.body,
    });
  }
}
