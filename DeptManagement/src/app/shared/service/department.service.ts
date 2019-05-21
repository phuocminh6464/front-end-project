import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; //HttpClient thay thế cho Http
import { Configuration } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { Department } from './department';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
    this.actionUrl = configurarion.serverWithApiUrl + 'departments/';
  }

  /* GET departments from the server */
  public getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.actionUrl)
                    .pipe(map((data:Department[]) => {
                        return data;}));
    // Some APIs may bury the data that you want within an object.
    // So you might have to dig that data out by processing the Observable result with the RxJS map operator.
  }

  /* GET an department from the server by id */
  public getDepartmentById(id: number): Observable<Department> {
      return this.http.get<Department>(this.actionUrl + id);
  }

  /* POST an department to the server */
  public add(department: Department): Observable<Department> {
      return this.http.post<Department>(this.actionUrl, department);
  }

  /* PUT an department to the server */
  public update(id:number, department: Department): Observable<void> {
      return this.http.put<void>(this.actionUrl +id, department);
  }

  /* DELETE an department to the server */
  public delete(id: number) {
      return this.http.delete<Department>(this.actionUrl + id);
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
