import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getHttpStatusForDomainException } from './domain-exception-mapper';
import { DomainException } from 'src/domain/exceptions/DomainException';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let statusCode: number;

    if (exception instanceof DomainException) {
      statusCode = getHttpStatusForDomainException(exception);
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const errorResponse = {
      statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    const traceId = request.headers?.['x-trace-id'] || request.traceId || 'no-trace';
    const path = request.originalUrl || request.url;
    const method = request.method;
    const hostUrl = `${request.protocol}://${request.headers.host}`;
    const headers = request.headers;
    const body = request.body;

    const startTime = request._startTime || request.startTime || request.headers?.['x-started-at'];
    console.log(`Start time: ${startTime}`);
    const elapsedTime = startTime ? (Date.now() - Number(startTime)) : 0;

    const formatted = `[${new Date().toISOString()}] | traceId: ${traceId} | Method: ${method} | Host: ${hostUrl} | Endpoint: ${path} | Headers: ${headers} | Body: ${body} | httpStatus: ${statusCode} | Time: ${elapsedTime}ms | Response: ${JSON.stringify(errorResponse)}`;

    this.logger.error(formatted, (exception as any)?.stack);

    response.status(statusCode).json(errorResponse);
  }
}