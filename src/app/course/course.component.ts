import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ListTaskComponent } from "./list-task/list-task.component";
import { Subject } from '../interfaces/Subject';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectsService } from '../services/subjects/subjects.service';
import { Lesson } from '../interfaces/Lessons';
import { LessonPostService } from '../services/lessons/lesson-post.service';
import saveAs from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
  imports: [PaymentComponent, FormsModule, RouterModule, AsyncPipe, ListTaskComponent, ReactiveFormsModule]
})
export class CourseComponent implements OnInit {

  subjects: Subject[] | undefined

  constructor(private lessonService: LessonPostService, private subjectService: SubjectsService, private activateRoute: ActivatedRoute, private courseService: CourseService, private formBuild: FormBuilder) { }
  courseId?: number;
  courseInfo: Course | undefined;
  errorMessage?: string;


  subjectId?: number;
  payload: any;
  imageUrl: any;

  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    this.getSubjects(this.courseId);
  }

  submenuAbierto = false;

  toggleSubmenu() {
    this.submenuAbierto = !this.submenuAbierto;
  }
  postSubject() {
    console.info(this.courseId)
    if (this.courseId) {
      this.courseService.postSubject(this.subjectForm.value as Subject, this.courseId).subscribe({
        next: (cita) => {
          console.info(cita)


        },
        error: (userData) => {
          console.log(userData)

        },
        complete: () => {
          console.info("Completo")
          if (this.courseId) {
            this.getSubjects(this.courseId);
          }
        }
      })
    }


  }

  subjectIdEdit(id: number) {
    this.subjectId = id
  }

  getSubjects(courseId: number) {
    this.subjectService.getSubjectsByCourseId(courseId).subscribe({
      next: (cita) => {
        console.info(cita)
        this.subjects = cita
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
      next: (cita) => {
        console.info(cita)
        this.courseInfo = cita

      },
      error: (userData) => {
        console.log(userData)

      },
      complete: () => {
        console.info("Completo")
      }
    })
  }

  /**
 * Selecciona el archivo y valida si es admitido.
 * @param event 
 */
  setFile(event: any) {
    let temp = <File>event.target.files[0];
    console.log("payload ", temp.name);
    console.log('size', temp.size);
    console.log('type', temp.type);
    switch (temp.type) {
      case "image/png":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpeg":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpg":
        this.payload = <File>event.target.files[0];
        break;
      default:
        //this.abrirModalFormat();
        break;
    }
  }
  /**
 * Descarga el archivo desde la API.
 * @param leccion La id del usuario.
 */
  downloadImage(leccion: Lesson) {
    this.lessonService.getFile(leccion.idLesson).subscribe({
      next: (data: any) => {
        console.info("data", data);
        const mimeType = localStorage.getItem("fileType");
          const parts = mimeType!.split('/');
          const fileType = parts[1];
          saveAs(data, leccion.name + "." + fileType);
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
