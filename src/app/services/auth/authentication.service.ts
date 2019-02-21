import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  /**
   * Login for valid user
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    return this.http.post < any > (`${environment.apiUrl}/users/authenticate`, {
      username: username,
      password: password
    }).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in
        // between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    }));
  }

  /**
   * Log user out
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}