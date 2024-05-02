import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseComponentComponent } from '../../components/course-component/course-component.component';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CourseService } from '../../services/courses/course.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User } from '../../interfaces/User';
import { Router, RouterModule } from '@angular/router';
import { ImgMoveComponent } from "../../components/img-move/img-move.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourseComponentComponent, CarouselComponentComponent, AsyncPipe, ErrorMessageComponent, RouterModule, ImgMoveComponent]
})
export class HomeComponent {




}
