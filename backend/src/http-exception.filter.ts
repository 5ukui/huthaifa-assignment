import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger as WinstonLogger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: WinstonLogger) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException
        ? exception.getStatus()
        : 500;

        const message = exception instanceof HttpException
        ? exception.getResponse()
        : exception;

        this.logger.error(`${request.method} ${request.url}`, {
        statusCode: status,
        message,
        });

        response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        });
    }
}
