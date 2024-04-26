import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { env_api } from '../../../environment/env_api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router:Router) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem('token')!= null);
    this.currentToken = new BehaviorSubject<string>(sessionStorage.getItem('token') ?? '');
    this.currentUserAdmin = new BehaviorSubject<boolean>(false);
   }

   register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(`${env_api.urlApi}/users/`, credentials)
    .pipe(tap((response) => {
      console.log(response);
      sessionStorage.setItem("token", response.token);
      this.currentToken.next(response.token);
      this.currentUserLoginOn.next(true);
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Ya existe un usuario con ese username o email"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
}
