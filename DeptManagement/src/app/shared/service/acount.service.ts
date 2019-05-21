import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Configuration } from 'src/app/app.constants';
import { Account } from './account';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
    this.actionUrl = configurarion.serverWithApiUrl + 'accounts/';
  }

  public getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.actionUrl)
                    .pipe(map((data:Account[])=>{
                        return data;
                    }));
  }

  public getAccByUser(user: string): Observable<Account> {
      return this.http.get<Account>(this.actionUrl + user);
  }

  public register(acc: Account): Observable<Account> {
      return this.http.post<Account>(this.actionUrl, acc);
  }

  public update(user: string, acc: Account): Observable<void> {
      return this.http.put<void>(this.actionUrl + user, acc);
  }

  public delete(user: string) {
      return this.http.delete<Account>(this.actionUrl + user);
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
