import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseComponentComponent } from '../course-component/course-component.component';
import { EMPTY, Observable, catchError } from 'rxjs';
import { CourseService } from '../../services/courses/course.service';
import { AsyncPipe } from '@angular/common';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-carousel-component',
  standalone: true,
  imports: [CourseComponentComponent, AsyncPipe, CourseCardComponent],
  templateUrl: './carousel-component.component.html',
  styleUrl: './carousel-component.component.css',
})
export class CarouselComponentComponent {


  
  @Input() inputValue?: string;
  
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
      return EMPTY;
    }));
  }

  

  changeSlideRight() {
    if(this.courses != null){
      this.currentPage += 1;
      this.getPageCourses();
    }else{
      this.currentPage = 0;
      this.getPageCourses();
    }
  }

  changeSlideLeft() {
    if(this.courses != null){
      this.currentPage -= 1;
      this.getPageCourses();
    }else{
      this.currentPage = 0;
      this.getPageCourses();
    }
  }
}
