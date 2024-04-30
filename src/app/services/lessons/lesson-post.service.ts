import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lessonPostI } from '../../modelos/class.inteface';
import { env_api } from '../../../environment/env_api';

@Injectable({
  providedIn: 'root'
})
export class LessonPostService {

  constructor(private http: HttpClient) { }

  postLessons(idSubject: number,cita:lessonPostI): Observable<lessonPostI> {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem(`token`)}`);
    
    return this.http.post<any>(`${env_api.urlApi}lessons/${idSubject}`,cita).pipe(
      
    );
  }


  putLessons(idLesson: number,cita:lessonPostI): Observable<lessonPostI> {
    
    return this.http.put<any>(`${env_api.urlApi}lessons/${idLesson}`,cita).pipe(
      
    )
  }
}
