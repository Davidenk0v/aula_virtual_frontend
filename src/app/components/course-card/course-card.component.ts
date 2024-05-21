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
  courseId?:number;
  imageUrl: any;

  ngOnInit(): void {
    this.courseId = this.courseInfo!.idCourse;
    this.downloadImage(this.courseId);
  }

  deleteCourse(idCourse:number) {
    this.courseService.deleteCourseById(idCourse).subscribe((response) => {
      this.successMessage = response.Ok;
      console.log(response);
      window.location.reload();
    });
  }

  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImage(user: number) {
    this.courseService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data", data);
        this.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
        localStorage.removeItem("fileType");
      }
    });
  }
}
