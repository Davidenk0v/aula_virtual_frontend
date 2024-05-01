import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-info-course',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './info-course.component.html',
  styleUrl: './info-course.component.css'
})
export class InfoCourseComponent {
  @Input() courseInfo?: Course;
}
