export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel; // Enum
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt?: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin
    }

    // Recibimos esto como un string para crear instancias
    // "{"level": "high", "message": "Hola Mundo", "createdAt": "21349TZ12341234"}"
    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin: origin
        });
        /* No hace falta porque lo estamos enviando arriba */
        // log.createdAt = new Date(createdAt);
        return log;
    }

}