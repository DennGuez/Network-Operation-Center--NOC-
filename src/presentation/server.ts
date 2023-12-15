import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
    // new postgresSQLLogDatasource()
);

export class Server {
    public static start() {

        console.log('Server started...');

        /* Mandar email */
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'dennisrodriguezx@gmail.com',
            subject: 'Logs del sistema',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Lorem impsum</p>
                <p>Ver logs adjuntos</p>
            `
        })
        
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