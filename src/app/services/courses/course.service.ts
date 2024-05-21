import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { environment } from '../../../environments/environment';
import { Observable , catchError, map, throwError } from 'rxjs';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';
import { Subject } from '../../interfaces/Subject';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;

  headers_object = new HttpHeaders()
  .set("Authorization", "Bearer " + sessionStorage.getItem('token'))
  .set("Access-Control-Allow-Origin", "*")

  httpOptions = {
    headers: this.headers_object
  };

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

  getCourseById(idCourse: number): Observable<Course> {
    
    return this.http.get<Course>(`${environment.api.urlApi}/courses/${idCourse}`)
      .pipe(
        map(response => {
          const course = response; // Ajusta esto si la clave es diferente
          if (!course) {
            throw new Error('No se encontraron cursos');
          }
          return course;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error code: ${error.status}, message: ${error.message}`;
          }
          console.error(errorMessage);
          return throwError(() => errorMessage);
        })
      );
  }
  

  addCourse(credentials: CourseRequest, idTeacher:string): Observable<Course> {
    return this.http.post<Course>(`${environment.api.urlApi}/courses/${idTeacher}`, credentials).pipe(

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


  


  postSubject(credentials: Subject,idCourse :number): Observable<number> {
    return this.http.post<Record<string,number>>(`${environment.api.urlApi}/subjects/${idCourse}`, credentials).pipe(
      map(response => response['Tema subido ']),
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

  getAllCoursesByUser(idUser:string): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api.urlApi}/courses/user/${idUser}`)
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
