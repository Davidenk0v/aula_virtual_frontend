import { Component, Input } from '@angular/core';
import { classI } from '../modelos/class.interface';

@Component({
  selector: 'app-course-component',
  standalone: true,
  imports: [],
  templateUrl: './course-component.component.html',
  styleUrl: './course-component.component.css'
})
export class CourseComponentComponent {

  @Input() class:classI = {  className: '', description: '' };


}
