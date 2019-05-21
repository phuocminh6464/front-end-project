import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';

import { AppService } from './app.service';
import { Employee } from './app.entity';

@Controller('emps')
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get()
    getAllEmps() : Promise<Employee[]> {
        return this.appService.getAll();
    }

    @Get(':id')
    getEmp(@Param('id') id) : Promise<Employee> {
        return this.appService.getEmpByID(id);
    }

    @Post()
    create(@Body() emp: Employee) {
        return this.appService.updateOrAdd(emp);
    }

    @Put(':id')
    updateEmp(@Body() emp: Employee) {
        this.appService.updateOrAdd(emp);
    }

    @Delete(':id')
    deleteEmp(@Param('id') id) {
        this.appService.deleteEmpByID(id);
    }
}
