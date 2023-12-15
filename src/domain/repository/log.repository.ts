import { LogEntity, LogSeverityLevel } from "../entities/log.entity";



export abstract class LogRepository {
/* Estos metodos son los que si o si tiene que implementar esta clase */
/* Se llaman igual a los de log.datasource.ts porque esta clase va terminar llamando el datsource */
    abstract saveLog( log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}