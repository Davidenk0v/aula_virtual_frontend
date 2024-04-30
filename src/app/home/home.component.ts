import { Component } from '@angular/core';
import { Class } from '../interfaces/Class';
import { CourseComponentComponent } from '../course-component/course-component.component';
import { CarouselComponentComponent } from '../carousel-component/carousel-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseComponentComponent, CarouselComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  popularCourses: Class[] = [
    { className: 'Mates', description: 'test 1' },
    { className: 'Ciencias', description: 'test 1' },
    { className: 'letras', description: 'test 1' },
    { className: 'fisica', description: 'test 1' },
    { className: 'quimica', description: 'test 1' },
    { className: 'prueba', description: 'test 1' },
  ];

  newCourses: Class[] = [
    { className: 'Angular', description: 'test 2' },
    { className: 'React', description: 'test 2' },
    { className: 'Python', description: 'test 2' },
    { className: 'SpringBoot', description: 'test 2' },
  ];

}
