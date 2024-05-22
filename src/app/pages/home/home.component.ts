import { Component } from '@angular/core';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CourseService } from '../../services/courses/course.service';
import { RouterModule } from '@angular/router';
import { Course } from '../../interfaces/Course';
import { MoreCoursesComponent } from '../../components/more-courses/more-courses.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MoreCoursesComponent, CarouselComponentComponent, AsyncPipe, ErrorMessageComponent, RouterModule, CourseCardComponent]
})
export class HomeComponent {

    constructor(private courseService:CourseService){}

    courses?: Observable<Course[]>;
    haveCourses?:boolean = true
    errorMessage?:string;
    numberOfCoursesPerPage = 5;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getPageCourses()
    }

    getPageCourses(){
        this.courses = this.courseService.getAllCoursesInPages(0)
        .pipe(catchError((error:string)=> {
          this.errorMessage = error;
    
          return EMPTY;
        }));
      }

}
