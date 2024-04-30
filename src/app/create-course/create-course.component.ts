import { Component } from '@angular/core';
import { classContentI } from '../interfaces/classContent.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {


  // Este objeto es el que luego se mandrá a la base de datos
  courseInfo: classContentI = {
    name: "",
    description: "",
    startDate: new Date(1999,1,1),
    finishDate: new Date(2000,1,1),
    pago: 0
  }

  showData() {
    console.log(this.courseInfo);
  }

}
