import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CommentI } from '../../interfaces/Comment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  errorMessage?: string;

  postComment(idCourse: number, idUser:string, comment: CommentI): Observable<CommentI> {
    
    return this.http.post<CommentI>(`${environment.api.urlApi}/comment/${idUser}/${idCourse}`, comment).pipe(
      
    );
  }

  getAllComments(idCourse?: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.api.urlApi}/comment/${idCourse}/course`)
  }


  deleteComment(idComment: number): Observable<Comment> {
    
    return this.http.delete<any>(`${environment.api.urlApi}/comment/${idComment}`).pipe(
      
    )
  }

  getProfileImage(id: number): any {
    return this.http.get(`${environment.api.urlApi}/comment/file/${id}`, { responseType: 'blob' }).pipe(
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

}
