import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
export declare class EmployeeService {
    private readonly empRepository;
    constructor(empRepository: Repository<Employee>);
    getAll(): Promise<Employee[]>;
    getEmp(): Promise<Employee>;
    getEmpByID(id: number): Promise<Employee>;
    updateOrAdd(emp: Employee): Promise<Employee>;
    deleteEmpByID(id: number): Promise<void>;
}
