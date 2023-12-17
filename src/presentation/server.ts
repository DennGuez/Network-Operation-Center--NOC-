import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl( 
    // new FileSystemDatasource(),
    new MongoLogDatasource()
    // new postgresSQLLogDatasource()
);

const emailService = new EmailService();

export class Server {
    public static async start() {

        console.log('Server started...');
        
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['dennisrodriguezx@gmail.com', 'holasoydennis@gmail.com']
        // )

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

        /* Obtener los por Severity */
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs)

        /* Mandar email con archivos */
        // emailService.sendEmailWithFileSystemLogs(
        //     ['dennisrodriguezx@gmail.com']
        // )
        
        /* Pasamos argumentos a nuestro servicio y lo ejecutamos cada 5 sec */
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://googlasdfse.com'
        //         new CheckService(
        //             logRepository,
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error )
        //         ).execute( url )
        //     }
        // );

    }
}