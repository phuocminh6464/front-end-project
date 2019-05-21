import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; //HttpClient thay thế cho Http
import { Configuration } from '../../app.constants';
import { Employee } from './employee';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
    this.actionUrl = configurarion.serverWithApiUrl + 'employees/';
  }

  /* GET employees from the server */
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.actionUrl)
                    .pipe(map((data:Employee[]) => {
                        return data;}));
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

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
