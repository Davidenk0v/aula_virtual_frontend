import { Component } from '@angular/core';
import { TeacherComponent } from "../teacher/teacher.component";
@Component({
    selector: 'app-zoom',
    standalone: true,
    templateUrl: './zoom.component.html',
    styleUrl: './zoom.component.css',
    imports: [TeacherComponent]
})
export class ZoomComponent {

}
