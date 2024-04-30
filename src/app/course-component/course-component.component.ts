import { Component, Input } from '@angular/core';
import { Class } from '../interfaces/Class';

@Component({
  selector: 'app-course-component',
  standalone: true,
  imports: [],
  templateUrl: './course-component.component.html',
  styleUrl: './course-component.component.css'
})
export class CourseComponentComponent {

  @Input() class:Class = {  className: '', description: '' };


}
