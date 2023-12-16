import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
interface SendEmailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string
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


    constructor(){}

    async sendEmail( options: SendEmailOptions ):Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            console.log(sendInformation);

    /* Si todo sale bien creamos el log para enviar al repository */
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: "Email sent",
                origin: "email.service.ts"
            });          

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: "Email not sent",
                origin: "email.service.ts"
            });          
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string [] ) {
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem impsum</p>
            <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];
        
        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }


}