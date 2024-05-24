import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListTaskComponent } from '../list-task/list-task.component';
import { PaymentComponent } from '../payment/payment.component';
import { CommentI } from '../../interfaces/Comment';
import { AuthService } from '../../services/auth/auth.service';
import { CommentService } from '../../services/comments/comments.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  imports: [
    PaymentComponent,
    FormsModule,
    RouterModule,
    ListTaskComponent,
    ReactiveFormsModule,
  ],
})
export class CommentComponent {
  @Input() courseId?: number;
  loggeIn: boolean = false;
  currentDate =
    new Date().getFullYear() +
    '-0' +
    new Date().getMonth() +
    '-' +
    new Date().getUTCDate();
  newComment = '';
  coments?: any;
  isEditingAComment?: boolean = false;
  clickedComment = 0;
  editedComment = '';
  nameUser: any;
  idUser = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private jwtService: JwtService,
    private user: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getComents(this.courseId);
    this.nameUser = this.jwtService.getNameFromToken();
    this.idUser = this.jwtService.getIdFromToken();
    this.isLogged();
    console.log(this.coments);
  }

  getComents(courseId: number) {
    this.commentService.getAllComments(courseId).subscribe({
      next: (comments: any) => {
        this.coments = comments;
        this.coments.sort((a: any, b: any) => a.idComment - b.idComment);
        console.log('Comments:', this.coments);
      },
      error: (error: Error) => {
        console.error('Error fetching comments:', error);
      },
    });
  }

  getUsername(): string {
    return this.jwtService.getUsernameFromToken();
  }

  addNewComent(idCourse?: number) {
    console.log(this.newComment);
    let comment: CommentI = {
      text: this.newComment,
      date: this.currentDate,
      user: {
        firstname: this.nameUser,
        username: this.jwtService.getEmailFromToken(),
      },
    };
    if(comment.text != '' && comment.text != null){
      this.commentService.postComment(idCourse!, this.idUser, comment).subscribe({
        next: (cita: any) => {},
        error: (userData: any) => {
          console.log(userData);
        },
        complete: () => {
          this.coments.unshift(comment);
        },
      });
    }
    }

    confirmBox(){
      Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este comentario?',
        text: 'El comentario se eliminará permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado',
            'El comentario se ha eliminado correctamente.',
            'success'
          )
          //borrar comentario
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Has cancelado la eliminación del comentario.',
            'error'
          )
        }
      })
    }

  toggleEdit(id: number, indexInComment: number) {
    this.clickedComment = id;
    
    this.isEditingAComment = !this.isEditingAComment;
    this.editedComment = this.coments[indexInComment].text;
    console.log(this.coments[indexInComment].idComment);
  }

  confirmCommentChange(id: number, newComment: string) {
    console.log(id);
    console.log(this.coments[id].text);

    this.coments[id].text = newComment;
    const idComment = this.coments[id].idComment;

    this.commentService.editComment(this.coments[id], idComment).subscribe({
      next: (data: any) => {
        console.info(data);
      },
      error: (userData: any) => {
        console.log(userData);
      },
      complete: () => {
        console.info('Completo');
      },
    });
    this.toggleEdit(this.coments[id].idComment, id);
  }

  deleteComment(id: number, indexInComment: number) {
    this.commentService.deleteComment(id).subscribe({
      next: (data: any) => {
        
        console.info(data);
        this.getComents(this.courseId!)
      },
      error: (userData: any) => {
        console.log(userData);
      },
      complete: () => {
        console.info('Completo');
      },
    });
  }

  isLogged() {
    this.authService.loggedIn$.subscribe({
      next: (logged: any) => {
        this.loggeIn = logged;
        if (!this.loggeIn) {
          this.loggeIn = sessionStorage.getItem('loggin') == 'true';
        }
      },
      error: (error: Error) => {
        console.error('Error fetching comments:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }
}
