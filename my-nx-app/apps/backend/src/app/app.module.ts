import { Employee } from './app.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      port:5432,
      password: "minh6464",
      database: "TestDB",
      entities:[Employee], //đổi thành tên entity luôn ko để đường dẫn
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Employee])
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {
  constructor() {
    console.log('employee module get loaded');
  }
}
