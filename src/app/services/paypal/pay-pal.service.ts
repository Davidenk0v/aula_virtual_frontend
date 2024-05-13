import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");
  id:Number=0

  constructor(private http:HttpClient) {
    this.currentUserLogin= new BehaviorSubject<boolean>(sessionStorage.getItem("tokenPayPal")!=null);
    this.currentUserData= new BehaviorSubject<string>(sessionStorage.getItem("tokenPayPal")|| "");
    
   }

   
   login(): Observable<any> {
    const authString = environment.paypal.clientIdPayPal + ':' + environment.paypal.secretKeyPayPal;
    const encodedAuthString = btoa(authString);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedAuthString}`,
      'Content-Type': 'application/x-www-form-urlencoded' // Indica el tipo de contenido
    });

    return this.http.post<any>(environment.paypal.urlPayPal + 'oauth2/token', 'grant_type=client_credentials', { headers: headers }).pipe(
      tap((userData) => {
        sessionStorage.setItem('tokenPayPal', userData.access_token);
        this.currentUserData.next(userData);
        this.currentUserLogin.next(true);
      }),
      catchError(this.handleError)
    );
  }





  logout(): void{
    sessionStorage.removeItem("tokenPayPal");
    this.currentUserLogin.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error', error.error);
    }else{console.error('Backend retorno el codigo', error.status)}
    return throwError(()=> new Error("Algo fallo , "+ error.message))
  }

  get userData():Observable<string>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLogin.asObservable();
  }

  get token():string{
    return this.currentUserData.value;
  }
}

