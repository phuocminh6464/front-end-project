"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const employee_service_1 = require("./employee/employee.service");
const employee_controller_1 = require("./employee/employee.controller");
const employee_entity_1 = require("./employee/employee.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                username: "postgres",
                port: 5432,
                password: "minh6464",
                database: "TestDB",
                entities: ["dist/**/**.entity{.ts,.js}"],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee])
        ],
        controllers: [app_controller_1.AppController, employee_controller_1.EmployeeController],
        providers: [app_service_1.AppService, employee_service_1.EmployeeService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map