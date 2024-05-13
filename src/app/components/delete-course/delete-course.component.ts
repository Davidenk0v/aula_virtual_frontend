import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseService } from '../../services/courses/course.service';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {

  constructor(private courseService:CourseService){}
  @Output() profileEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() idBorrar?:number;

  cancelar():void{
    this.profileEdited.emit(false)
  }


  
  borrar(){
    console.info(this.idBorrar)
    
    if (this.idBorrar) {
      this.courseService.deleteCourseById(this.idBorrar).subscribe({
      next: (data) => {
        console.info(data);
      },error:(data) => {
        console.info(data, "Error")
      },
      complete:()=> {
        console.info("Completo")  
        alert("Actualizado")      
        this.cancelar();
      }
    });
    }
  }
}
