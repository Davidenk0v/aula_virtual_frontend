import { Injectable } from '@angular/core';
import { course } from '../modelos/class.inteface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { enviroment } from '../enviroment/url';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  verDatos(name: string): Observable<course[]> {
    return this.http.get<Record<string, course[]>>(`${enviroment.urlApi}courses/lista/${name}`).pipe(
      map(response => response['Cursos'])
    );
  }
  
}
