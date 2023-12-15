import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    /* Inyectamos una dependecia */

    // constructor( logDatasource: LogDatasource ){
    //     this.logDatasource = logDatasource
    // }

    /* Manera corta */
    constructor(
    /* La funcion basicamente de esto es poder cambiar por cualquier otro data source SQL, Mongo, etc /
    /  siempre y cuando implemente los metodos que tenemos */
        private readonly logDatasource: LogDatasource, 
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog( log );
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLevel );
    }
}