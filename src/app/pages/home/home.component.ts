import { Component } from '@angular/core';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CourseService } from '../../services/courses/course.service';
import { RouterModule } from '@angular/router';
import { ImgMoveComponent } from "../../components/img-move/img-move.component";
import { Course } from '../../interfaces/Course';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CarouselComponentComponent, CarouselComponentComponent, AsyncPipe, ErrorMessageComponent, RouterModule, ImgMoveComponent]
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
