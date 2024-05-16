import { Component } from '@angular/core';
import { TeacherComponent } from "../teacher/teacher.component";
import { StudentComponent } from "../student/student.component";
@Component({
    selector: 'app-zoom',
    standalone: true,
    templateUrl: './zoom.component.html',
    styleUrl: './zoom.component.css',
    imports: [TeacherComponent, StudentComponent]
})
export class ZoomComponent {

    role:string |  undefined = "TEACHER"
    constructor(){}
}
