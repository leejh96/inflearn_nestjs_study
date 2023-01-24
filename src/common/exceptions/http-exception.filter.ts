import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | string
      | {
          error: string;
          statusCode: number;
          message: string | string[];
        };

    if (typeof err === 'string') {
      response.status(status).json({
        msg: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        err,
      });
    } else {
      response.status(status).json({
        msg: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...err,
      });
    }
  }
}