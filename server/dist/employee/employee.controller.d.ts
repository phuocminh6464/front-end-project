import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly empService;
    constructor(empService: EmployeeService);
    getAllEmps(): Promise<Employee[]>;
    getEmp(id: any): Promise<Employee>;
    create(emp: Employee): Promise<Employee>;
    updateEmp(emp: Employee): void;
    deleteEmp(id: any): void;
}
