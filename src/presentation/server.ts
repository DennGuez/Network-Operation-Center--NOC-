import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start() {

        console.log('Server started...');

        /* Pasamos argumentos a nuestro servicio y lo ejecutamos cada 5 sec */
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckService(
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error )
                ).execute( url )
            }
        );

    }
}