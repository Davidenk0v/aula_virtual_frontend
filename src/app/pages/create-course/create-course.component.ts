import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/courses/course.service';
import { Router } from '@angular/router';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';
import { JwtService } from '../../services/jwt/jwt.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CategoryService } from '../../services/categories/category.service';
import { Category } from '../../interfaces/Category';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  errorMessage?: string;
  courseId?:number;
  idTeacher:string = '';
  categories?:Category[];

  constructor(private formBuilder:FormBuilder, 
    private courseService:CourseService, 
    private router:Router, 
    private jwtService:JwtService,
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.idTeacher = this.jwtService.getIdFromToken();
    this.getCategories();
  }

  // Este objeto es el que luego se mandrá a la base de datos
  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [0, [Validators.required]],
    category: ['', [Validators.required]]
  });

  addCourse(){
    if (this.newCourseForm.valid) {
      this.courseService
        .addCourse(this.newCourseForm.value as CourseRequest, this.idTeacher)
        .subscribe({
          next: (userData) => {
            console.info(userData.idCourse)
            this.courseId = userData.idCourse;

          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.newCourseForm.value as CourseRequest)
  
          },
          complete: () => {
            this.router.navigate(['/course', this.courseId]);
  
            this.newCourseForm.reset();
          },
        });
    } else {
      this.newCourseForm.markAllAsTouched();
      this.errorMessage = 'Porfavor rellene todos los campos';
      console.info(this.newCourseForm.value as CourseRequest)
    }
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
    });
  } 

}
