import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
    // new postgresSQLLogDatasource()
);

const emailService = new EmailService();

export class Server {
    public static start() {

        console.log('Server started...');
        
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['dennisrodriguezx@gmail.com', 'holasoydennis@gmail.com']
        )

        /* Mandar email */
        // emailService.sendEmail({
        //     to: 'dennisrodriguezx@gmail.com',
        //     subject: 'Logs del sistema',
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>Lorem impsum</p>
        //         <p>Ver logs adjuntos</p>
        //     `
        // })

        /* Mandar email con archivos */
        // emailService.sendEmailWithFileSystemLogs(
        //     ['dennisrodriguezx@gmail.com']
        // )
        
        /* Pasamos argumentos a nuestro servicio y lo ejecutamos cada 5 sec */
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error )
        //         ).execute( url )
        //     }
        // );

    }
}