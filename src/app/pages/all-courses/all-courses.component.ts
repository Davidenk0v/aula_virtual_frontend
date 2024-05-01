import { Component } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/courses/course.service';
import { Course } from '../../interfaces/Course';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseCardComponent, AsyncPipe, RouterModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {

  constructor(private courseService:CourseService) { }

  courses?:Course[];

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
    });
  }

}
