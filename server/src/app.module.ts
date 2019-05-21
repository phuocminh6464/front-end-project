import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { Employee } from './employee/employee.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      port:5432,
      password: "minh6464",
      database: "TestDB",
      entities:["src/**/**.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Employee])
    // EmployeeModule
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService, EmployeeService],
})
export class AppModule {

}
