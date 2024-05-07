import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { TeacherProfileComponent } from "../teacher-profile/teacher-profile.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [UserProfileComponent, TeacherProfileComponent]
})
export class UserComponent {

  role: string = 'TEACHER';

  constructor(){}
}
