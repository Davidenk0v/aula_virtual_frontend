import { Injectable } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  stringSearch: string = ""
  constructor(private http: HttpClient) { }

  verDatos(): Observable<Course[]> {
    return this.http.get<Record<string, Course[]>>(`${environment.api.urlApi}/courses/lista/${this.stringSearch}`).pipe(
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
