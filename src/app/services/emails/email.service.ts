import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  

  forgotPassword(email:string):Observable<any>{
    return this.http.get<any>(`${environment.api.urlHost}auth/password/${email}`)
    .pipe(tap((response) => {
      console.info(response);
      
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  setNewPassword(password:string, idUser:string):Observable<any>{
    return this.http.post<any>(`${environment.api.urlHost}auth/password/set-newpassword/${idUser}`, password)
    .pipe(tap((response) => {
      console.info(response);
      
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  sendVerifyEmail(email:string):Observable<any>{
    return this.http.get<any>(`${environment.api.urlHost}auth/password/send-verify-email/${email}`)
    .pipe(tap((response) => {
      console.info(response);
      
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  verifyEmail(email:string):Observable<any>{
    return this.http.get<any>(`${environment.api.urlHost}auth/password/verify-email/${email}`)
    .pipe(tap((response) => {
      console.info(response);
      
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Email incorrecto"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
}
