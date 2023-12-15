import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
interface SendEmailOptions {
    to: string,
    subject: string,
    htmlBody: string,
    // attachements:
}

/* Sera nuestro servicio para poder enviar correos pero tambien  / 
/  nos servira como Patron Adaptador de nodemailer              */
export class EmailService {
/* Este es el objeto que termina mandando el email */
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail( options: SendEmailOptions ):Promise<boolean> {
        const { to, subject, htmlBody } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });
            console.log(sendInformation);
            
            return true;
        } catch (error) {
            return false;
        }
    }
}