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
  }

  getComents(courseId: number) {
    this.commentService.getAllComments(courseId).subscribe({
      next: (comments: any) => {
        this.coments = comments;
        this.coments.sort((a: any, b: any) => b.idComment - a.idComment);
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

  toggleEdit(id: number) {
    this.clickedComment = id;
    this.isEditingAComment = !this.isEditingAComment;
    this.editedComment = this.coments[id - 1].text;
  }

  confirmCommentChange(id: number, newComment: string) {
    this.coments[id - 1].text = newComment;
    this.commentService.editComment(this.coments[id - 1], id).subscribe({
      next: (data: any) => {
        console.info(data);
      },
      error: (userData: any) => {
        console.log(userData);
      },
      complete: () => {
        console.info('Completo');
        if (this.coments.IdComment) {
          this.getSubjects(this.coments.IdComment);
        }
      },
    });
    this.toggleEdit(id);
  }
  getSubjects(IdComment: any) {
    throw new Error('Method not implemented.');
  }

  isLogged() {
    this.authService.loggedIn$.subscribe({
      next: (logged: any) => {
        this.loggeIn = logged;
        if (!this.loggeIn) {
          this.loggeIn =
            sessionStorage.getItem('loggin') == 'true';
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
