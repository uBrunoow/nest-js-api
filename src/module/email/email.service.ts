import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from 'src/env';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    newPassword: string,
  ): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      html: `
      <body style="width: 100%; height: 100%; margin: 0 auto;">
      <div style="background-color: #ddd; padding: 20px">
        <div style="background-color: #121212; border-radius: 15px; box-shadow: 0 0 20px #00000050; padding: 80px; color: #fff; font-family: sans-serif; height: 500px; width: 500px; margin: 0 auto">
          <h1 style="text-align: center; color: #00ff00; width: 100%; margin-top: 90px;" >Oh no! You forgot your password?</h1>
          <h1 style="text-align: center;">💸</h1>

          <p style="width: 100%; text-align: center; margin-bottom: 60px; font-size: 20px">Don't worry, if you lost your password or wish to reset it use the link below to get started</p>
          <a href=${newPassword}>
            <button style="background-color: #00b600; border: none; outline: none; border-radius: 100px; padding: 15px; width: 500px; color: #fff; font-weight: 600; font-size: 20px; text-transform: uppercase;">Reset your password</button>
          </a>
        </div>
      </div>
      </body>
    `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
