import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserEdit } from '../interfaces/User';
import { UserProfile } from '../interfaces/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;
  
  getProfileByEmail(email:string): Observable<User> {
    return this.http.get<User>(`${environment.api.urlApi}/users/${email}`)
    .pipe(catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
  }


  updateProfile(email:string, profile:UserEdit):Observable<UserProfile>{
    return this.http.put<Record<string, UserProfile>>(`${environment.api.urlApi}/users/${email}`,profile).pipe(
      map(response => response['Guardado']),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    )
  }
}
