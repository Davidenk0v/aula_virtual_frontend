import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component'
import { TemarioComponent } from './temario/temario.component';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent,TemarioComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}
