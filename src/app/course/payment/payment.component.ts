import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  @Input() courseInfo?: Course;
}
