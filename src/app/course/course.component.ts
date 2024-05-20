import { Component } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { CommentService } from '../services/comments/comments.service';
import { CommentI } from '../interfaces/Comment';
import { ListTaskComponent } from './list-task/list-task.component';
import { Subject } from '../interfaces/Subject';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubjectsService } from '../services/subjects/subjects.service';
import { JwtService } from '../services/jwt/jwt.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
  imports: [
    PaymentComponent,
    FormsModule,
    RouterModule,
    ListTaskComponent,
    ReactiveFormsModule,
  ],
})
export class CourseComponent {
  subjects?: Subject[];

  constructor(
    private subjectService: SubjectsService,
    private activateRoute: ActivatedRoute,
    private courseService: CourseService,
    private formBuild: FormBuilder,
    private commentService: CommentService,
    private jwtService: JwtService,
    private user: ProfileService,
    private authService:AuthService
  ) {}

  courseId?: number;
  courseInfo?: Course;
  errorMessage?: string;
  nameUser = ""
  idUser:string = ""
  userData= {
  };
  submenuAbierto = false;
  currentDate = new Date().getFullYear() + "-0" + new Date().getMonth() + "-" + new Date().getUTCDate()  ; 
  newComment = ""
  coments?: any;
  subjectId?: number;
  loggeIn: boolean = false;
  isEditingAComment?: boolean = false;
  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });


  getComents(courseId: number) {
    this.commentService.getAllComments(courseId).subscribe({
      next: (comments) => {
        this.coments = comments;
        this.coments.sort((a: any, b: any) => a.idComment - b.idComment);
        console.log('Comments:', this.coments);
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      }
    });
  }

  getUsername(): string{ 
    return this.jwtService.getUsernameFromToken()
  }
  
  addNewComent(idCourse?: number) {
    let comment: CommentI = { 
      text: this.newComment,
      date: this.currentDate, 
      user: { 
        firstname: this.nameUser,
        username: this.jwtService.getEmailFromToken()
      }
      
    };

    this.commentService.postComment(idCourse!, this.idUser, comment)
    .subscribe({
      next: (cita) => {
      },
      error: (userData) => {
        console.log(userData);
      },
      complete: () => {
        this.coments.unshift(comment)
      },
    })
  }

  clickedComment = 0
  editedComment = ""

  toggleEdit(id: number) {
    this.clickedComment = id
    this.isEditingAComment = !this.isEditingAComment
    this.editedComment = this.coments[id - 1].text
  }


  confirmCommentChange(id: number, newComment: string) {
    this.coments[id - 1].text = newComment
    this.commentService.editComment(this.coments[id-1], id).subscribe({
      next: (data) => {
        console.info(data);
      },
      error: (userData) => {
        console.log(userData);
      },
      complete: () => {
        console.info('Completo');
        if (this.coments.IdComment) {
          this.getSubjects(this.coments.IdComment);
        }
      },
    })
    this.toggleEdit(id)
  }


  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    this.getSubjects(this.courseId);
    this.getComents(this.courseId)
    this.nameUser = this.jwtService.getNameFromToken();
    this.idUser = this.jwtService.getIdFromToken()
    this.isLogged()
  }

  isLogged(){
    this.authService.loggedIn$.subscribe({
      next: (logged) => {
        this.loggeIn = logged;
        if(!this.loggeIn){
          this.loggeIn = sessionStorage.getItem('loggin') == 'true' ? true : false;
        }
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }



    toggleSubmenu() {
        this.submenuAbierto = !this.submenuAbierto;
    }


    //Metodo modal
    abrirModal(id :number) {
      console.info(id)
      this.subjectId = id
      const modal = document.getElementById('modalEditarTema');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
      
    }
    
    cerrarModal() {
      const modal = document.getElementById('modalEditarTema');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }

    abrirModalDelete(id :number) {
      console.info(id)
      this.subjectId = id
      const modal = document.getElementById('alertModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
      
    }
    
    cerrarModalDelete() {
      const modal = document.getElementById('alertModal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }

  //Service 
  postSubject(){
    console.info(this.courseId)
    if (this.courseId) {
      this.courseService
        .postSubject(this.subjectForm.value as Subject, this.courseId)
        .subscribe({
          next: (cita) => {
            console.info(cita);
          },
          error: (userData) => {
            console.log(userData);
          },
          complete: () => {
            console.info('Completo');
            if (this.courseId) {
              this.getSubjects(this.courseId);
            }
          },
        });
    }
  }

  subjectIdEdit(id: number) {
    this.subjectId = id;
  }

  getSubjects(courseId: number) {
    this.subjectService.getSubjectsByCourseId(courseId).subscribe({
      next: (cita) => {
        this.subjects = cita;
        
      },
      error: (userData) => {        
        console.log(userData);
      },
      complete: () => {
        console.info('Completo');
      },
    });
  }

  getCourseInfo(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.courseInfo = course;
      },
      error: (error) => {
        console.error('Error fetching course info:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }
  
}
