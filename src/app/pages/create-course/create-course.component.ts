import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/courses/course.service';
import { Router } from '@angular/router';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  errorMessage?: string;

  constructor(private formBuilder:FormBuilder, private courseService:CourseService, private router:Router) { }

  // Este objeto es el que luego se mandrá a la base de datos
  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [0, [Validators.required]],
    idTeacher: [1, [Validators.required]]
  });

  addWorkout(){
    if (this.newCourseForm.valid) {
      this.courseService
        .addCourse(this.newCourseForm.value as CourseRequest)
        .subscribe({
          next: (userData) => {
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            this.router.navigateByUrl('/all-courses');
            this.newCourseForm.reset();
          },
        });
    } else {
      this.newCourseForm.markAllAsTouched();
    }
  }

}
