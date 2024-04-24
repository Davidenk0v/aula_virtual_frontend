import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component'
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}
