import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component'
import { TemarioComponent } from './temario/temario.component';
import { CompraComponent } from './compra/compra.component';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent,TemarioComponent,CompraComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}
