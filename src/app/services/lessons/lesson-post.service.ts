import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../interfaces/Lesson';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonPostService {

  constructor(private http: HttpClient) { }

  postLessons(idSubject: number,cita:Lesson): Observable<Lesson> {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem(`token`)}`);
    
    return this.http.post<any>(`${environment.api.urlApi}lessons/${idSubject}`,cita).pipe(
      
    );
  }


  putLessons(idLesson: number,cita:Lesson): Observable<Lesson> {
    return this.http.put<any>(`${environment.api.urlApi}lessons/${idLesson}`,cita).pipe(
      
    )
  }


  deleteLessons(idLesson: number): Observable<Lesson> {
    
    return this.http.delete<any>(`${environment.api.urlApi}lessons/${idLesson}`).pipe(
      
    )
  }
}
