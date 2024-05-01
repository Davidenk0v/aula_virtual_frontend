import { Injectable } from '@angular/core';
import { course } from '../modelos/class.inteface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { env_api } from '../../environment/env_api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  stringSearch: string = ""
  constructor(private http: HttpClient) { }

  verDatos(): Observable<course[]> {
    return this.http.get<Record<string, course[]>>(`${env_api.urlApi}courses/lista/${this.stringSearch}`).pipe(
      map(response => response['Cursos'])
    );
  }
  

  
  public set search(search : string) {
    this.stringSearch = search;
  }
  setString(value: string) {
    this.stringSearch = value;
  }


  getString(): string {
    return this.stringSearch;
  }
}
