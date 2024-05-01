import { Component, Input } from '@angular/core';
import { classI } from '../modelos/class.interface';
import { CourseComponentComponent } from '../course-component/course-component.component';

@Component({
  selector: 'app-carousel-component',
  standalone: true,
  imports: [CourseComponentComponent],
  templateUrl: './carousel-component.component.html',
  styleUrl: './carousel-component.component.css',
})
export class CarouselComponentComponent {
  @Input() courses: classI[] = [{ className: '', description: '' }];

  @Input() coursesLength: number = 0;

  classesChantity = 3;

  currentSlide = 0;
  totalClasses = 0;

  ngOnInit(): void {
    this.courses;
    this.coursesLength;
    this.totalClasses = this.coursesLength;
    this.currentSlide;
  }

  changeSlideRight() {
    if (
      this.currentSlide < this.totalClasses - this.classesChantity &&
      this.currentSlide > -1
    ) {
      this.currentSlide = this.currentSlide + this.classesChantity;
    } else {
      this.currentSlide = 0;
    }
  }

  changeSlideLeft() {
    if (
      this.currentSlide < this.totalClasses - this.classesChantity &&
      this.currentSlide > 0
    ) {
      this.currentSlide = this.totalClasses - 3;
    } else {
      this.currentSlide = 0;
    }
  }
}
