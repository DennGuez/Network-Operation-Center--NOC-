import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient()
const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityLevelEnum[log.level]
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityLevelEnum[severityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: { level: level }
        });

        return dbLogs.map( dbLog => LogEntity.fromObject(dbLog) );
    }
    
}