import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { RegisterRequest } from '../../interfaces/requests/RegisterRequest';
import { jwtDecode } from 'jwt-decode';
import { JwtKeycloak } from '../../interfaces/JwtKeycloak';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private takeNameFromToken = new BehaviorSubject<string>('');
  name$ = this.takeNameFromToken.asObservable();

  private takeRoleFromToken = new BehaviorSubject<string[]>([]);
  role$ = this.takeRoleFromToken.asObservable();

  currentUserTeacher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http:HttpClient, private router:Router) {
    this.currentToken = new BehaviorSubject<string>(sessionStorage.getItem('token') ?? '');
   }

   login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(`${environment.api.urlHost}auth/login`,credentials).pipe( //La url de la API se obtiene del archivo env_api.ts
      tap((userData) => {
        const {name} = jwtDecode(userData.access_token) as JwtKeycloak;
        const {realm_access} = jwtDecode(userData.access_token) as JwtKeycloak;
        this.takeNameFromToken.next(name ?? '');
        this.loggedInSubject.next(true);
        this.takeRoleFromToken.next(realm_access.roles ?? [])
        sessionStorage.setItem("loggin", "true");
      }),
      map((userData)=> userData),
      catchError(this.handleError)
    );
  }
  
  register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(`${environment.api.urlHost}auth/register`, credentials)
    .pipe(tap((response) => {
      console.log(response);
      this.loggedInSubject.next(true);
      this.router.navigateByUrl('/login')
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }


  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggin");
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('/login')
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }


  private handleError(error:HttpErrorResponse){
    if(error.status === 401){
      console.error(error.error);
      return throwError(()=> new Error("Contraseña o email incorrecto"));
    }else if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Ya existe un usuario con ese username o email"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
}
