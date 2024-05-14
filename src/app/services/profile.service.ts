import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  errorMessage?: string;

  getProfileByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.api.urlApi}/users/${username}`)
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


  updateProfile(email: string, profile: UserEdit): Observable<UserProfile> {
    return this.http.put<Record<string, UserProfile>>(`${environment.api.urlApi}/users/${email}`, profile).pipe(
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

  setProfileImage(user: number, payload: File) {
    const formData: FormData = new FormData();
    formData.append('file ', payload, payload.name);
    console.log("formData", formData);
    return this.http.post(`${environment.api.urlApi}/users/file/${user}`, formData, { responseType: 'text' }).pipe(
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

  getProfileImage(user: number): any {
    return this.http.get(`${environment.api.urlApi}/users/file/${user}`, { responseType: 'blob' }).pipe(
      map(res => {
        res.text().then((strBlob => {
          localStorage.setItem("image", strBlob);
        }))
        var file = new File([res], "untitled", {lastModified: Date.now(), type: res.type});
        return res;
      }),
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

}
