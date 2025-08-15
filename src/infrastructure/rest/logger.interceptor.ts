import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const traceId = uuidv4();
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const endpoint = request.originalUrl;
    const host = `${request.protocol}://${request.headers.host}`;
    const headers = JSON.stringify(request.headers);
    const body = request.body ? JSON.stringify(request.body) : 'Without body';

    return next.handle().pipe(
      tap((responseData) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const elapsedTime = Date.now() - now;
        const responseString = JSON.stringify(responseData);

        console.log(
          `[${new Date().toISOString()}] | traceId: ${traceId} | Method: ${method} | Host: ${host} | Endpoint: ${endpoint} | Headers: ${headers} | Body: ${body} | httpStatus: ${statusCode} | Time: ${elapsedTime}ms | Response: ${responseString}`
        );
      })
    );
  }
}
