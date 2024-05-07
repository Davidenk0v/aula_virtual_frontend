import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;

  getAllCoursesInPages(currentPage:number): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api.urlApi}/courses/pages?page=${currentPage}`)
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

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api.urlApi}/courses/`)
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

  getCourseById(idCourse:number): Observable<Course> {
    return this.http.get<Record<string,Course>>(`${environment.api.urlApi}/courses/${idCourse}`)
    .pipe(
      map(response => response['Id encontrado ']),
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

  addCourse(credentials: CourseRequest): Observable<any> {
    return this.http.post<any>(`${environment.api.urlApi}/courses/2`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar errores de la solicitud
        let errorMessage = '';
  
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
  
        // Devolver un observable de error con el mensaje de error
        return throwError(() => errorMessage);
      })
    );
  }

  editCourse(credentials: CourseRequest,idCourse :number): Observable<any> {
    return this.http.put<any>(`${environment.api.urlApi}/courses/${idCourse}`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar errores de la solicitud
        let errorMessage = '';
  
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
  
        // Devolver un observable de error con el mensaje de error
        return throwError(() => errorMessage);
      })
    );
  }

  deleteCourseById(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api.urlApi}/courses/${id}`).pipe(
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

  searchCourseByName(name:string): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api.urlApi}/courses/lista/${name}`)
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


  getAllCoursesTeacher(id:number): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api.urlApi}/users/listaTeacher/${id}`)
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

}
