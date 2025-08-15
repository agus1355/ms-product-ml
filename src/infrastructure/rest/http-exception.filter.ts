import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getHttpStatusForDomainException } from './domain-exception-mapper';
import { DomainException } from 'src/domain/exceptions/DomainException';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let statusCode: number;

    if(exception instanceof DomainException){
      statusCode = getHttpStatusForDomainException(exception);
    }
    else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    }
    else{
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(statusCode).json({
      statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}