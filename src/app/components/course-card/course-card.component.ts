import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/courses/course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl:'./course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() courseInfo?: Course;

  constructor(private courseService:CourseService) {}
  successMessage = '';
  errorMessage = '';

  deleteCourse(idCourse:number) {
    this.courseService.deleteCourseById(idCourse).subscribe((response) => {
      this.successMessage = response.Ok;
      console.log(response);
      window.location.reload();
    });
  }
}
