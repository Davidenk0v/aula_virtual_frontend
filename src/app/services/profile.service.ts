import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../interfaces/Course';
import { User, UserEdit } from '../interfaces/User';
import { UserProfile } from '../interfaces/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;
  getProfileById(idProfile:number): Observable<UserProfile> {
    return this.http.get<Record<string, UserProfile>>(`${environment.api.urlApi}/users/${idProfile}`)
    .pipe(
      map(response => response['Guardado']),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
  }


  updateProfile(id:number, profile:UserEdit):Observable<UserProfile>{
    return this.http.put<Record<string, UserProfile>>(`${environment.api.urlApi}/users/${id}`,profile).pipe(
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
