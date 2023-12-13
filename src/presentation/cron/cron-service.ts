import { CronJob } from 'cron';

/* Es mejor usar las interfaces cuando son objetos */
/* Pero cuando son tipos de datos "sueltos" es mejor usar type */
type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {

        const job = new CronJob(
            cronTime,
            onTick
        );

        job.start()

        return job;
    }

}