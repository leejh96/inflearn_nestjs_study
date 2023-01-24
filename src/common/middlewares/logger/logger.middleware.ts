import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    // 요청이 완료되었을 때 로그찍기
    res.on('finish', () => {
      this.logger.log(req.ip, req.originalUrl);
      this.logger.log(res.statusCode);
    })
    next();
  }
}
