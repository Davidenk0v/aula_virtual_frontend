import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/courses/course.service';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  
  courseId:number | undefined;

  errorMessage?:string;
  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    pago: [0, [Validators.required]],
    idTeacher: [1, [Validators.required]]
  });

  constructor(private formBuilder:FormBuilder, private courseService:CourseService, private router:Router,private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
  }

  edit(){
    if (this.courseId) {
      this.courseService
        .editCourse(this.newCourseForm.value as CourseRequest,this.courseId)
        .subscribe({
          next: (userData) => {
            console.info(userData)
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.newCourseForm.value as CourseRequest)
  
          },
          complete: () => {
            this.router.navigateByUrl('/profile');
            this.newCourseForm.reset();
          },
        });
    }
    
  }

  // Este objeto es el que luego se mandrá a la base de datos
  

}
