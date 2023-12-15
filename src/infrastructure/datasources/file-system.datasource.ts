import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


/* La idea de crear un datasource es para poder luego poder cambiar por cualquier otra base de datos */
export class FileSystemDatasource implements LogDatasource {


    /* Argumentos que recibe esta clase */
    private readonly logPath        = 'logs/'
    private readonly allLogsPath    = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath   = 'logs/logs-high.log'

    constructor() {
        this.createLogsFiles()
    }

    private  createLogsFiles = () => {
        if ( !fs.existsSync( this.logPath) ) {
            fs.mkdirSync( this. logPath )
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '');
        })

    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${ JSON.stringify(newLog) }\n`

        fs.appendFileSync( this.allLogsPath, logAsJson );
        if ( newLog.level === LogSeverityLevel.low ) return
        if ( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8')
        const logs = content.split('/n').map(
        /* Tenemos una instancia de nuestro LogEntity */
            log => LogEntity.fromJson(log)
        );
        /* Modo mas corto del anterior codigo */
        // const logs = content.split('/n').map(LogEntity.fromJson);

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${ severityLevel } not implemented`);        } 
    }

}