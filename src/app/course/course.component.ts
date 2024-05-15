import { Component, OnInit } from '@angular/core';
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
import { User } from '../interfaces/User';
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
export class CourseComponent implements OnInit {
  subjects?: Subject[];

  constructor(
    private subjectService: SubjectsService,
    private activateRoute: ActivatedRoute,
    private courseService: CourseService,
    private formBuild: FormBuilder,
    private commentService: CommentService,
    private jwtService: JwtService,
    private user: ProfileService
  ) {}
  courseId?: number;
  courseInfo??: Course;
  errorMessage?: string;

  currentDate = new Date().getFullYear() + "-0" + new Date().getMonth() + "-" + new Date().getUTCDate()  ; 

  newComment = ""

  coments?: any;

  getComents(courseId: number) {
    console.log(this.currentDate);
    
    this.commentService.getAllComments(courseId).subscribe({
      next: (comments) => {
        this.coments = comments;
        console.log('Comments:', this.coments);
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      }
    });
  }

  
  
  addNewComent(idCourse?: number) {
    let comment: CommentI = { 
      text: this.newComment,
      date: this.currentDate, 
      user: { 
        firstname: this.nameUser
      }
      
    };

    console.log(comment);
    
    
    // EL "3" el id del usuario, hay que hayarlo para que el comentario sea del propio usuario
    this.commentService.postComment(idCourse!, 3, comment)
    .subscribe({
      next: (cita) => {
        console.info("cita" + cita);
      },
      error: (userData) => {
        console.log(userData);
      },
      complete: () => {
        this.coments.unshift(comment)
      },
    })
  }

  subjectId?: number;

  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });


  nameUser = ""
  emailUser = ""
  userData= {
  };

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    this.getSubjects(this.courseId);
    this.getComents(this.courseId)
    this.userData = this.user.getAllProfiles();
    this.nameUser = this.jwtService.getNameFromToken();
    this.emailUser = this.jwtService.getEmailFromToken()
    console.log(`${this.nameUser} y ${this.emailUser}`);
    console.log(this.userData);
    
  }

  submenuAbierto = false;

  toggleSubmenu() {
    this.submenuAbierto = !this.submenuAbierto;
  }

  postSubject() {
    console.info(this.courseId);
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
