import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly empRepository: Repository<Employee>,
  ) { }

  async getAll(): Promise<Employee[]> {
    return await this.empRepository.find();
  }

  async getEmp(): Promise<Employee> {
    let query = `Select * from employee where "EmpId" = 1`;
    return await this.empRepository.query(query);
  }

  async getEmpByID(id: number): Promise<Employee> {
    try {
      return await this.empRepository.findOne(id); //find
    }
    catch (error) {
      throw new NotFoundException();
    }
  }


  async updateOrAdd(emp: Employee): Promise<Employee> {
    try{
      return await this.empRepository.save(emp);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }

    //Khi dùng Promise<UpdateResult> thì mới dùng hàm update() được
    //Khi dùng Promise<Employee>
    // try {
    //   let entityToUpdate = await this.empRepository.findOne(id);

    //   Object.entries(emp).map(([key, value]) => {
    //     entityToUpdate[key] = value;
    //   });

    //   return await this.empRepository.save(emp);
    // }
    // catch (error) {
    //   throw new BadRequestException(error.message);
    // }
  }

  async deleteEmpByID(id: number) {
    try {
      let emp = await this.empRepository.findOne(id); //find by id
      await this.empRepository.remove(emp);
    }
    catch (error) {
      throw new NotFoundException();
    }
  }
}