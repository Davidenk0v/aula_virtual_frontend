import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class EditCourseComponent implements OnInit{
  
  courseId?:number;

  errorMessage?:string;

  courseInfo?:Course;

  editCourseForm = this.formBuilder.group({
    name: [this.courseInfo?.name, [Validators.required]],
    description: [this.courseInfo?.description, [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [this.courseInfo?.price, [Validators.required]]
  });

  constructor(private formBuilder:FormBuilder, private courseService:CourseService, private router:Router,private activateRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getCourse();
    this.valueCourse();
    this.courseId = this.activateRoute.snapshot.params['idCourse'];
    console.info(this.courseId)
  }

  edit(){
    if (this.editCourseForm.valid && this.courseId) {
      this.courseService
        .editCourse(this.editCourseForm.value as CourseRequest,this.courseId)
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
          },
        });
    }
    
  }

  getCourse(){
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


  valueCourse(){
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
          }});
  }

  }
}