import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { EMPTY, Observable, catchError } from 'rxjs';
import { CourseService } from '../../services/courses/course.service';
import { AsyncPipe } from '@angular/common';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-carousel-component',
  standalone: true,
  imports: [AsyncPipe, CourseCardComponent],
  templateUrl: './carousel-component.component.html',
  styleUrl: './carousel-component.component.css',
})
export class CarouselComponentComponent {

  errorMessage?:string;
  successMessage?:string;
  courses?: Observable<Course[]>;
  teacher?:number;
  currentPage:number = 0;

  constructor(private courseService:CourseService){}

  ngOnInit(): void {
    this.getPageCourses( )
  }

  showdata(){
    console.log(this.courses);
  }

  getPageCourses(){
    this.courses = this.courseService.getAllCoursesInPages(this.currentPage)
    .pipe(catchError((error:string)=> {
      this.errorMessage = error;
      this.currentPage = 0
      this.courses = this.courseService.getAllCoursesInPages(this.currentPage)

      return EMPTY;
    }));
  }

  autoFirstPage() {
    this.currentPage = 0
  
  }
  

  changeSlideRight() {
    if(this.courses != null){
      this.currentPage += 1;
      this.getPageCourses();
    }else{
      this.currentPage = 0;
      this.getPageCourses();
    }
    console.log(this.currentPage);
  }

  changeSlideLeft() {
    if(this.currentPage > 1){
      this.currentPage -= 1;
      this.getPageCourses();
    }else{
      this.currentPage = 0;
      this.getPageCourses();
    }
    console.log(this.currentPage);

  }
}
