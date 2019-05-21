import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './../../../../libs/data/src/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[];
  private actionUrl: string;

  constructor(private http:HttpClient){
    this.actionUrl = "http://localhost:3333/api/emps/";
    this.getAllEmployees();
  }

  /* GET employees from the server */
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.actionUrl);
    // Some APIs may bury the data that you want within an object.
    // So you might have to dig that data out by processing the Observable result with the RxJS map operator.
  }

  /* GET an employee from the server by id */
  public getEmployeeByID(id: number): Observable<Employee> {
      return this.http.get<Employee>(this.actionUrl + id);
  }

  /* POST an employee to the server */
  public add(employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(this.actionUrl, employee);
  }

  /* PUT an employee to the server */
  public update(id: number, employee: Employee): Observable<void> {
      return this.http.put<void>(this.actionUrl + id, employee);
  }

  /* DELETE an employee to the server */
  public delete(id: number) {
      return this.http.delete<Employee>(this.actionUrl + id);
  }
}
