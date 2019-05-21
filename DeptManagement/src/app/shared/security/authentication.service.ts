import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Configuration } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private actionUrl: string;

  constructor(private http: HttpClient, configurarion: Configuration) {
   this.actionUrl = configurarion.serverWithApiUrl + 'accounts/';
  }

    login(username: string, password: string) {
        return this.http.post<any>(this.actionUrl, { UserName: username, Pass: password })
            .pipe(map(acc => {
                // login successful if there's a jwt token in the response
                if (acc && acc.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser',acc);
                }
                return acc;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
