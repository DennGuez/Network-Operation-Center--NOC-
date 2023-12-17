import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

/* Su funcion basicamente es revisar un servicio */
export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        /* Formca corta de crear propiedades e inicializarlas */
        /* Inyectamos un repositroio */
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    private callLogsRepositories( log: LogEntity ) {
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log)
        })
    }

    public async execute( url: string ): Promise<boolean> {
        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error(`Error on check service ${ url }`);
            }
            /* Si todo sale bien grabamos un log */
            const message = `Service ${ url } working`;
            const log = new LogEntity({
                message: message,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts',
            } );
            this.callLogsRepositories(log);
            this.successCallback && this.successCallback();
            return true
        } catch (error) {
            /* Si falla */
            const erroMessage = `${ url } is not ok. ${ error }`
            const log = new LogEntity({
                message: erroMessage , 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            });
            this.callLogsRepositories(log);
            this.errorCallback && this.errorCallback( `${ erroMessage }`)
            return false
        }

    }
}