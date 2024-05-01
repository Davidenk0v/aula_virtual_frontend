import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './course-component.component.html',
  styleUrl: './course-component.component.css'
})
export class CourseComponentComponent {

  @Input() course?: Course;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class
  }


}
