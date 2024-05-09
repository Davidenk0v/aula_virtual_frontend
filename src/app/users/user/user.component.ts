import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { TeacherProfileComponent } from "../teacher-profile/teacher-profile.component";
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [UserProfileComponent, TeacherProfileComponent]
})
export class UserComponent {

  role?:string;

  constructor(private authService:AuthService, private jwtService:JwtService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getRole()
  }


  private getRole():any{
    this.authService.role$.subscribe((roleFromToken)=> {
      if(roleFromToken.includes('teacher_class_room')) {
        this.role = "teacher";
        sessionStorage.setItem
      }
      if(roleFromToken.includes('student_class_room')) this.role = "student";
      if(this.jwtService.getRoleFromToken()){
        console.log(this.jwtService.getRoleFromToken())
      }
    })
  }
}
