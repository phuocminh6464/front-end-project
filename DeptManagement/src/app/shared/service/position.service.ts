import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; //HttpClient thay thế cho Http
import { Configuration } from '../../app.constants';
import { Position } from './position';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
    this.actionUrl = configurarion.serverWithApiUrl + 'workons/';
  }

  /* GET Positions from the server */
  public getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.actionUrl)
                    .pipe(map((data:Position[]) => {
                        return data;}));
    // Some APIs may bury the data that you want within an object.
    // So you might have to dig that data out by processing the Observable result with the RxJS map operator.
  }

  /* GET an Position from the server by id */
  public getPositionByEmpID(id: number): Observable<Position> {
      return this.http.get<Position>(this.actionUrl +'emp/'+ id);
  }

  public getPositionByDeptID(id: number): Observable<Position> {
    return this.http.get<Position>(this.actionUrl +'dept/'+ id);
  }

  public getPosition(empId: number, deptId: number): Observable<Position> {
    return this.http.get<Position>(this.actionUrl + empId + '&'+ deptId);
  }

  /* POST an Position to the server */
  public add(position: Position): Observable<Position> {
      return this.http.post<Position>(this.actionUrl, position);
  }

  /* PUT an position to the server by empID */
  public update(empId: number, deptId: number, position: Position): Observable<void> {
      return this.http.put<void>(this.actionUrl + empId + '&'+ deptId, position);
  }

  //~/api/workons/{empID}&{deptID}
  /* DELETE an position to the server */
  public delete(empID: number, deptID: number) {
      return this.http.delete<Position>(this.actionUrl + empID + '&' + deptID);
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
