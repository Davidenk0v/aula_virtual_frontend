import { Component, OnInit } from '@angular/core'; 
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ListTaskComponent } from "./list-task/list-task.component";
import { Subject } from '../interfaces/Subject';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectsService } from '../services/subjects/subjects.service';
import { Lesson } from '../interfaces/Lesson';
@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
    imports: [PaymentComponent,FormsModule, RouterModule, AsyncPipe, ListTaskComponent,ReactiveFormsModule]
})
export class CourseComponent implements OnInit{

  subjects: Subject[] | undefined

  constructor(private subjectService:SubjectsService,private activateRoute: ActivatedRoute, private courseService:CourseService,private formBuild: FormBuilder) { }
  courseId?:number;
  courseInfo:Course | undefined;
  errorMessage?:string;


  subjectId?: number;
  

  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    console.log(this.courseInfo);
  }

  getCourseInfo(courseId: number) {
    this.courseInfo = this.courseService.getCourseById(courseId).pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }

}
