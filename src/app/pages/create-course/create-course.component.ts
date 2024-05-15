import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/courses/course.service';
import { Router } from '@angular/router';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';
import { JwtService } from '../../services/jwt/jwt.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  errorMessage?: string;


  idCourse:number | undefined;
  constructor(private formBuilder:FormBuilder, private courseService:CourseService, private router:Router, private jwtService:JwtService) { }

  payload: any;
  imageUrl: any;
  emailTeacher:string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.emailTeacher = this.jwtService.getEmailFromToken();
  }

  // Este objeto es el que luego se mandrá a la base de datos
  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [0, [Validators.required]]
  });

  addCourse(){
    if (this.newCourseForm.valid) {
      this.courseService
        .addCourse(this.newCourseForm.value as CourseRequest, 1, this.payload)
        .subscribe({
          next: (userData) => {
            this.idCourse = userData
            console.info(userData)

          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.newCourseForm.value as CourseRequest)
  
          },
          complete: () => {
            if (this.idCourse) {
              this.router.navigateByUrl('/courses/' + this.idCourse);
            }
            this.newCourseForm.reset();
          },
        });
    } else {
      this.newCourseForm.markAllAsTouched();
      this.errorMessage = 'Porfavor rellene todos los campos';
      console.info(this.newCourseForm.value as CourseRequest)
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

}
