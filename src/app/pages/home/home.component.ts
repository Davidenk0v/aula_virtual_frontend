import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseComponentComponent } from '../../components/course-component/course-component.component';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CourseService } from '../../services/courses/course.service';
import { RouterModule } from '@angular/router';
import { ImgMoveComponent } from "../../components/img-move/img-move.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CarouselComponentComponent, CourseComponentComponent, CarouselComponentComponent, AsyncPipe, ErrorMessageComponent, RouterModule, ImgMoveComponent]
})
export class HomeComponent {

    constructor(private courseService:CourseService){}

    courseList?:Course[]
    haveCourses?:boolean = true
    currentPage:number = 1

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }



}
