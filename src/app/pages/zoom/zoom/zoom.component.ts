import { Component, Input } from '@angular/core';
import { TeacherComponent } from "../teacher/teacher.component";
import { StudentComponent } from "../student/student.component";
import { FormsModule } from '@angular/forms';
import { ZoomService } from '../../../services/zoom/zoom.service';
@Component({
    selector: 'app-zoom',
    standalone: true,
    templateUrl: './zoom.component.html',
    styleUrl: './zoom.component.css',
    imports: [TeacherComponent, StudentComponent,FormsModule]
})
export class ZoomComponent {

  @Input() role:string |  undefined
    constructor(private service : ZoomService){}

    boton(){
        this.service.createMeetingBd("",1234,"").subscribe({
            next: (data) => {
              console.log(data)
            },
            error: (error) => {
              console.log(error)
            },
            complete: () => {
              console.log('complete')
            }
          })
    }
}
