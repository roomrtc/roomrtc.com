import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUserInfo: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserInfo = this.currentUserSubject.asObservable();
  }

  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Login for valid user
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`,
                               {username: username, password: password})
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user
            // logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
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
    this.currentUserSubject.next(null);
  }
}
