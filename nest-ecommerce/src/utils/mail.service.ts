// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetUrl = `http://localhost:5173/reset-password/${token}`;
    const msg = {
      to,
      from: 'alvaro@ewaffle.cl', // Usa tu correo verificado en SendGrid
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    };

    await sgMail.send(msg);
  }
}
