import { CronJob} from 'cron';

export class Server {
    public static start() {

        console.log('Server started...');

        const job = new CronJob(
            '*/3 * * * * *', // cronTime
            () => {
                const date = new Date();
                console.log('2 second', date);
            }, // onTick
        );

        job.start()
    }
}