import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { Controller, Get, Param, Delete, Put, Body, Post } from '@nestjs/common';

@Controller('emps')
export class EmployeeController {

    constructor(private readonly empService : EmployeeService){}

    @Get()
    getAllEmps() : Promise<Employee[]> {
        return this.empService.getAll();
    }

    @Get(':id')
    getEmp(@Param('id') id) : Promise<Employee> {
        return this.empService.getEmpByID(id);
    }

    @Post()
    create(@Body() emp: Employee) {
        return this.empService.updateOrAdd(emp);
    }

    @Put(':id')
    updateEmp(@Body() emp: Employee) {
        this.empService.updateOrAdd(emp);
    }

    @Delete(':id')
    deleteEmp(@Param('id') id) {
        this.empService.deleteEmpByID(id);
    }
}