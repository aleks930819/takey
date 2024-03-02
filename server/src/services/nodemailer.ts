import * as nodemailer from 'nodemailer';
import environment from '../environments/environments';

class NodeMailer {
  /**
   * Initializes the transport object for sending emails.
   * @returns The transport object for sending emails.
   */
  private static initiateTransport() {
    return nodemailer.createTransport({
      host: environment.email_host,
      port: environment.email_port,
      auth: {
        user: environment.auth.user,
        pass: environment.auth.pass,
      },
    });
  }
  /**
   * Sends an email with the specified subject and message to the specified email address.
   * @param to - The email address to send the email to.
   * @param subject - The subject of the email.
   * @param html - The message of the email.
   */
  static sendMail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<nodemailer.SentMessageInfo> {
    return NodeMailer.initiateTransport().sendMail({
      from: process.env.FROM_EMAIL ? process.env.FROM_EMAIL : '<test@mail.com>',
      to,
      subject,
      html,
    } as nodemailer.SendMailOptions);
  }
}

export default NodeMailer;
