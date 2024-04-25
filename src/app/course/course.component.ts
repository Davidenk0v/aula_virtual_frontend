import { Component } from '@angular/core'; 
import {InfoCourseComponent} from '../course/info-course/info-course.component' 
import { PaymentComponent } from './payment/payment.component';
import { TopicComponent } from './topic/topic.component';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [InfoCourseComponent,TopicComponent,PaymentComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  
}
