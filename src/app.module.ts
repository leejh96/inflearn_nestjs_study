import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // cats로 시작하는 요청에 대해서만 Logger미들웨어 실행
    // 모든 요청에 대해서 적용하고 싶을때는 *를 삽입
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
