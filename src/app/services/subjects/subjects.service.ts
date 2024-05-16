import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subject } from '../../interfaces/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }

  errorMessage?: string;

  getSubjectsByCourseId(idCourse:number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.api.urlApi}/subjects/lista/${idCourse}`)
    .pipe(
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


  editSubjectById(idSubject:number,subject:Subject): Observable<Subject> {
    return this.http.put<Record<string,Subject>>(`${environment.api.urlApi}/subjects/${idSubject}`,subject)
    .pipe(
      map(response => response['Se ha modificado correctamente']),
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

  deleteSubjectById(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api.urlApi}/subjects/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
