import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

const sgMail = require('@sendgrid/mail');

export const Templates = {
  VERIFY_FORGOT_PASSWORD: {
    id: 'd-c686715b03c140bfaa0cd64f8ee47b0a',
    subject: { es: 'Recuperar contraseña', en: 'Recover password' }
  },
  SIGNUP_SUCCESS: {
    id: 'd-119f4b9666ab4835b29a4b62ec1135ef',
    subject: { es: 'Registro exitoso', en: 'Signup success' }
  }
};

@Injectable()
export class SengridService {

  private readonly config: any

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get('sendgrid')
    sgMail.setApiKey(this.config.apiKey);
  }

  sendEmail(to: any, template: any, substitutions: any) {
    console.log('Correo enviado a: ', to);
    
    return new Promise((resolve, reject) => {
      const msg = {
        to,
        from: this.config.fromEmail || 'andrescadena0607@gmail.com',
        templateId: template.id,
        dynamic_template_data: {
          ...substitutions,
          language: { [substitutions.lng]: true },
          subject: template.subject[substitutions.lng]
        }
      }

      sgMail.send(msg).then(async data => {
        if (data[0] && data[0].complete)
          resolve({ success: 'OK', ...data })
        else
          resolve({ success: 'ERROR', ...data })
      }).catch(err => {
        resolve({ error: 'ERROR', ...err })
      });
    })
  }
}
