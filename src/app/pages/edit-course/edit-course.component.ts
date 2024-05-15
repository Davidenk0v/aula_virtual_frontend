import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/courses/course.service';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {

  courseId?: number;

  errorMessage?: string;

  courseInfo?: Course;

  payload: any;

  editCourseForm = this.formBuilder.group({
    name: [this.courseInfo?.name, [Validators.required]],
    description: [this.courseInfo?.description, [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [this.courseInfo?.price, [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private courseService: CourseService, private router: Router, private activateRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getCourse();
    this.valueCourse();
    this.courseId = this.activateRoute.snapshot.params['idCourse'];
    console.info(this.courseId)
  }

  edit() {
    if (this.editCourseForm.valid && this.courseId) {
      this.courseService
        .editCourse(this.editCourseForm.value as CourseRequest, this.courseId)
        .subscribe({
          next: (userData) => {
            console.info(userData)
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.editCourseForm.value as CourseRequest)

          },
          complete: () => {
            this.router.navigateByUrl('/teacher-profile');
            this.editCourseForm.reset();
            this.uploadImage();
          },
        });
    }

  }

  getCourse() {
    if (this.courseId) {
      this.courseService
        .getCourseById(this.courseId)
        .subscribe({
          next: (courseData) => {
            console.info(courseData)
            this.courseInfo = courseData
          }
        });
    };
  }


  valueCourse() {
    if (this.courseId) {
      this.courseService
        .getCourseById(this.courseId)
        .subscribe({
          next: (userData) => {
            console.info(userData)
            this.editCourseForm.patchValue(userData)
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.editCourseForm.value as CourseRequest)
          }
        });
    }
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
        this.abrirModalFormat();
        break;
    }
  }

  /**
   * Envia el archivo a la API.
   */
  uploadImage(): void {
    // TODO se mantiene esta id numerica por el momento, sustituir por la id de busqueda preferida
    this.courseService.setProfileImage(this.courseId!, this.payload).subscribe({
      next: (cita) => {
        console.info(cita)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.info("Completa subida imagen perfil")
      }
    });
  }

  abrirModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  cerrarModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  setDefaultImage() {
    console.log("Se ha pulsado el boton")
    this.courseService.setDefaultProfileImage(this.courseId!).subscribe({
      next: (cita: any) => {
        console.info(cita)
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.info("Completo borrar imagen perfil")
        localStorage.removeItem("fileType");
        window.location.reload();
        //this.getPerfilTeacher(this.email)
      }
    });
  }
  
}