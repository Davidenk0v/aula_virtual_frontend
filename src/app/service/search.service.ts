import { Injectable } from '@angular/core';
import { course } from '../modelos/class.inteface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { env_api } from '../../environment/env_api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  verDatos(name: string): Observable<course[]> {
    return this.http.get<Record<string, course[]>>(`${env_api.urlApi}courses/lista/${name}`).pipe(
      map(response => response['Cursos'])
    );
  }
  
}
