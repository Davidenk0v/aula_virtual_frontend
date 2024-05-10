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
        .addCourse(this.newCourseForm.value as CourseRequest, this.emailTeacher)
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

}
