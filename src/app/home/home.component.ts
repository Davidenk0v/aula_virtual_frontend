import { Component } from '@angular/core';
import { classI } from '../modelos/class.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  classes: classI[] = [
    { className: 'clase 1', description: 'test 1' },
    { className: 'clase 2', description: 'test 1' },
    { className: 'clase 3', description: 'test 2' },
    { className: 'clase 4', description: 'test 1' },
    { className: 'clase 5', description: 'test 2' },
    { className: 'clase 6', description: 'test 1' },
    { className: 'clase 7', description: 'test 2' },
    { className: 'clase 8', description: 'test 1' },
    { className: 'clase 9', description: 'test 2' },
    { className: 'clase 10', description: 'test 2' },
  ];

  classesChantity = 3;
  
  currentSlidePopular = 0;
  totalClassesPopular = this.classes.length;

  changeSlideRightPopular() {
    if (
      this.currentSlidePopular <
        this.totalClassesPopular - this.classesChantity &&
      this.currentSlidePopular > -1
    ) {
      this.currentSlidePopular =
        this.currentSlidePopular + this.classesChantity;
    } else {
      this.currentSlidePopular = this.currentSlidePopular = 0;
    }
  }

  changeSlideLeftPopular() {
    if (
      this.currentSlidePopular <=
        this.totalClassesPopular - this.classesChantity &&
      this.currentSlidePopular > 0
    ) {
      this.currentSlidePopular =
        this.currentSlidePopular - this.classesChantity;
    } else {
      this.currentSlidePopular = this.currentSlidePopular = 0;
    }
  }

  currentSlideNew = 0;
  totalClassesNew = this.classes.length;

  changeSlideRightNew() {
    if (
      this.currentSlideNew <
        this.totalClassesNew - this.classesChantity &&
      this.currentSlideNew > -1
    ) {
      this.currentSlideNew =
        this.currentSlideNew + this.classesChantity;
    } else {
      this.currentSlideNew = this.currentSlideNew = 0;
    }
  }

  changeSlideLeftNew() {
    if (
      this.currentSlideNew <=
        this.totalClassesNew - this.classesChantity &&
      this.currentSlideNew > 0
    ) {
      this.currentSlideNew =
        this.currentSlideNew - this.classesChantity;
    } else {
      this.currentSlideNew = this.currentSlideNew = 0;
    }
  }

}
