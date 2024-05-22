import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Lesson } from '../../interfaces/Lesson';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LessonPostService {

  constructor(private http: HttpClient) { }
  errorMessage?: string;

  postLessons(idSubject: number,cita:Lesson) {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem(`token`)}`);
    return this.http.post<any>(`${environment.api.urlApi}/lessons/${idSubject}`,cita).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => this.errorMessage);
      })
    );
  }


  putLessons(idLesson: number,cita:Lesson) {
    return this.http.put<any>(`${environment.api.urlApi}/lessons/${idLesson}`,cita).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => this.errorMessage);
      })
    )
  }


  deleteLessons(idLesson: number): Observable<Lesson> {
    
    return this.http.delete<any>(`${environment.api.urlApi}/lessons/${idLesson}`).pipe(
      
    )
  }

  getIdLastLessond(idSubject: number) {
    return this.http.get<any>(`${environment.api.urlApi}/lessons/find/${idSubject}`).pipe(
      catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        this.errorMessage = `Error: ${error.error.message}`;
      } else {
        this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => this.errorMessage);
    }))
  }

  setFile(user: number, payload: File) {
    const formData: FormData = new FormData();
    formData.append('file ', payload, payload.name);
    console.log("formData", formData);
    return this.http.post(`${environment.api.urlApi}/lessons/file/${user}`, formData, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => this.errorMessage);
      })
    )
  }

  getFile(id: number): any {
    return this.http.get(`${environment.api.urlApi}/lessons/file/${id}`, { responseType: 'blob' }).pipe(
      map(res => {
        localStorage.setItem("fileType", res.type);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => this.errorMessage);
      })
    );
  }


  getLesson(idLesson: number) {
    return this.http.get<any>(`${environment.api.urlApi}/lessons/${idLesson}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => this.errorMessage);
      })
    )
  }

  
}
