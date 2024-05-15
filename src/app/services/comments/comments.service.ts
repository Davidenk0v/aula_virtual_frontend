import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentI } from '../../interfaces/Comment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

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
}
