import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../../interfaces/Course';
import { AuthService } from '../../services/auth/auth.service';
import { CourseService } from '../../services/courses/course.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {

  courseId?:number;
  courseInfo?: Course;
  errorMessage?: string;
  loggeIn:boolean = false;

  constructor(private activateRoute: ActivatedRoute, private authService:AuthService, private courseService:CourseService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId)
  }

  isLogged() {
    this.authService.loggedIn$.subscribe({
      next: (logged) => {
        this.loggeIn = logged;
        if (!this.loggeIn) {
          this.loggeIn = sessionStorage.getItem('loggin') == 'true' ? true : false;
        }
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }

  getCourseInfo(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.courseInfo = course;
      },
      error: (error) => {
        console.error('Error fetching course info:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }

}
