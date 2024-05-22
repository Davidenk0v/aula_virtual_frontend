import { Component, EventEmitter, Output } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/courses/course.service';
import { Course } from '../../interfaces/Course';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../../interfaces/Category';
import { CategoryService } from '../../services/categories/category.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FilterNavbarComponent } from '../../components/filter-navbar/filter-navbar.component';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseCardComponent, AsyncPipe, RouterModule, ReactiveFormsModule, FilterNavbarComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {

  constructor(
    private courseService:CourseService, 
    private categoryService:CategoryService,
    private formBuilder:FormBuilder
  ) { }

  courses?:Course[];
  categories!:Category[];
  coursesSearch!:Course[];

onCoursesSearch(valor:Course[]){
  console.log(valor)
  this.coursesSearch = valor;
}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.coursesSearch = courses;
      console.log(courses);
    });

    this.getCategories();
  }

  handleData(data: Course[]) {
    this.coursesSearch = data;
    console.log('Datos recibidos del hijo:', this.coursesSearch);
  }


  getCategories(){
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories)
    })
  }

}
