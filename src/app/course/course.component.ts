import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { CommentService } from '../services/comments/comments.service';
import { CommentI } from '../interfaces/Comment';
import { ListTaskComponent } from './list-task/list-task.component';
import { Subject } from '../interfaces/Subject';
import { Router } from '@angular/router';

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
import { LessonPostService } from '../services/lessons/lesson-post.service';
import { Lesson } from '../interfaces/Lessons';
import FileSaver from 'file-saver';

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
    private authService:AuthService,
    private router: Router,
    private lessonService: LessonPostService
  ) {}

  courseId?: number;
  courseInfo?: Course;
  errorMessage?: string;
  nameUser = ""
  idUser: string = ""
  userData = {
  };
  submenuAbierto = false;
  currentDate = new Date().getFullYear() + "-0" + new Date().getMonth() + "-" + new Date().getUTCDate();
  newComment = ""
  coments?: any;
  subjectId?: number;
  payload: any;
  imageUrl: any; loggeIn: boolean = false;
  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  

  getComents(courseId: number) {
    console.log(this.currentDate);

    this.commentService.getAllComments(courseId).subscribe({
      next: (comments) => {
        this.coments = comments;
        console.log('Comments:', this.coments);
        this.coments.forEach((comment: any) => {
          console.log("Comentarios", comment);
          this.downloadImage(comment.user.idUser, comment);
        });
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


    // EL "3" el id del usuario, hay que hayarlo para que el comentario sea del propio usuario
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


  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    this.getSubjects(this.courseId);
    this.getComents(this.courseId)
    this.nameUser = this.jwtService.getNameFromToken();
    this.idUser = this.jwtService.getIdFromToken()
    this.isLogged()
  }

  isLogged() {
    this.authService.loggedIn$.subscribe({
      next: (logged) => {
        this.loggeIn = logged;
        if (!this.loggeIn) {
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


  openedSubmenus: {[subjectId: number]: boolean } = {};

  toggleSubmenu(subject: any) {
    this.openedSubmenus[subject.idSubject] = !this.openedSubmenus[subject.idSubject];
  }


  //Metodo modal
  abrirModal(id: number) {
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

  abrirModalDelete(id: number) {
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
  postSubject() {
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
    this.subjectId = id
  }

  getSubjects(courseId: number) {
    this.subjectService.getSubjectsByCourseId(courseId).subscribe({
      next: (cita) => {
        this.subjects = cita;

      },
      error: (userData) => {
        console.log(userData)

      },
      complete: () => {
        console.info("Completo")
      }
    })


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

  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImage(user: number, comment: any) {
    this.commentService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("Imagen perfil", data);
        //saveAs(data, "save-me.txt");
        comment.user.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completa descarga imagen perfil")
        localStorage.removeItem("fileType");
      }
    });
  }

  showCreateTarea(idSubject:number){
    this.router.navigate(['/create-lessons/' + idSubject]); 
    //this.router.navigate(['/create-lessons/' + idSubject + this.courseId]); 

  }

  showEditarSubject(idSubject:number){
    const modal = document.getElementById('editarSubject');
    if (modal) {
      this.subjectId = idSubject;
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  deleteSubject(idSubject:number){
    
    if (this.courseId) {
      this.subjectService
        .deleteSubjectById(idSubject)
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

  showEditarLesson(idLesson:number){
    this.router.navigateByUrl('/edit-lessons/' + idLesson); 
  }

  deleteLesson(idLesson:number){
    this.lessonService.deleteLessons(idLesson).subscribe({
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

  cerrarModalFormatEditSubject() {
    if (this.subjectId) {
      this.subjectService
        .editSubjectById(this.subjectId, this.subjectForm.value as Subject)
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
              const modal = document.getElementById('editarSubject');
            if (modal) {
              modal.classList.remove('show');
              modal.style.display = 'none';
            }
            }
          },
        });
    }
  }

  /**
 * Descarga el archivo desde la API.
 * @param leccion La id del usuario.
 */
  downloadFile(leccion: Lesson) {
    this.lessonService.getFile(leccion.idLesson).subscribe({
      next: (data: any) => {
        console.info("data", data);
        const mimeType = localStorage.getItem("fileType");
          const parts = mimeType!.split('/');
          const fileType = parts[1];
          FileSaver.saveAs(data, leccion.contenido + "." + fileType);
          // Version que guarda el nombre de la bbdd
          //FileSaver.saveAs(data, leccion.contenido);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
        localStorage.removeItem("fileType");
      }
    });
  }

}

