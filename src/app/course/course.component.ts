import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component'
import { TemarioComponent } from './temario/temario.component'; 
import { PaymentComponent } from './payment/payment.component';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent,TemarioComponent,PaymentComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}
