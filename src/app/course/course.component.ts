import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component' 
import { PaymentComponent } from './payment/payment.component';
import { TopicComponent } from './topic/topic.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent,TopicComponent,PaymentComponent, RouterModule, AsyncPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  constructor(private activateRoute: ActivatedRoute, private courseService:CourseService) { }
  courseId?:number;
  courseInfo:Course | undefined;
  errorMessage?:string;

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId)
    console.log(this.courseInfo);
  }

  getCourseInfo(courseId:number){
      this.courseService.getCourseById(courseId).subscribe({
        next: (cita) => {
          console.info(cita)
          this.courseInfo = cita
        
        },
        error:(userData) => {
            console.log(userData)
            
        },
        complete:()=> {
          console.info("Completo")
        }
      })
    }
}
