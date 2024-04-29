import { Component } from '@angular/core';
import { classI } from '../modelos/class.interface';
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

  
  popularCourses: classI[] = [
    { className: 'Mates', description: 'test 1' },
    { className: 'Ciencias', description: 'test 1' },
    { className: 'letras', description: 'test 1' },
    { className: 'fisica', description: 'test 1' },
    { className: 'quimica', description: 'test 1' },
    { className: 'prueba', description: 'test 1' },
  ];

  newCourses: classI[] = [
    { className: 'Angular', description: 'test 2' },
    { className: 'React', description: 'test 2' },
    { className: 'Python', description: 'test 2' },
    { className: 'SpringBoot', description: 'test 2' },
  ];

}
