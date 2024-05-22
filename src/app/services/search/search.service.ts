import { Injectable } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  stringSearch: string = ""
  constructor(private http: HttpClient) { }

  searchCourse(word:string): Observable<Course[]> {
    return this.http.get<Record<string, Course[]>>(`${environment.api.urlApi}/courses/lista/${word}`).pipe(
      map(response => response['data'])
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
