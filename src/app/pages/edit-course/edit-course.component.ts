import { Component } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {

  //fechaFormateada: string | null;

  constructor(private datePipe: DatePipe) {
    // Formatear la fecha en el constructor o en cualquier método según tus necesidades
    //this.fechaFormateada =  this.datePipe.transform(this.courseInfo.startDate, 'dd/MM/yyyy');
  }

  ngOnInit(): void {
    
  }

  // Este objeto es el que luego se mandrá a la base de datos
  updatedData = {
    name: "",
    description: "",
    startDate: new Date(1999,1,1),
    finishDate: new Date(2000,1,1),
    pago: 0
  }

}
