import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  @Input() courseInfo?: Course;

  constructor(private activateRoute: ActivatedRoute, private courseService:CourseService) { }
  courseId?:number;
  imageUrl: any;

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.downloadImage(this.courseId);
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
