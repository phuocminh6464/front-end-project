import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; //HttpClient thay thế cho Http
import { Configuration } from '../../app.constants';
import { Salary } from './salary';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
    this.actionUrl = configurarion.serverWithApiUrl + 'salaries/';
  }

  /* GET Salaries from the server */
  public getAllSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.actionUrl)
                    .pipe(map((data:Salary[]) => {
                        return data;}));
    // Some APIs may bury the data that you want within an object.
    // So you might have to dig that data out by processing the Observable result with the RxJS map operator.
  }

  /* GET an Salary from the server by id */
  public getSalary(id: number): Observable<Salary> {
      return this.http.get<Salary>(this.actionUrl + id);
  }

  /* POST an Salary to the server */
  public add(salary: Salary): Observable<Position> {
      return this.http.post<Position>(this.actionUrl, salary);
  }

  /* PUT an Salary to the server */  //HÀM SAO RỒI
  public update(salary: Salary): Observable<void> {
      return this.http.put<void>(this.actionUrl + salary.employeeID, Salary);
  }

  /* DELETE an Salary to the server */
  public deleteSalary(id: number) {
      return this.http.delete<Salary>(this.actionUrl + id);
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
