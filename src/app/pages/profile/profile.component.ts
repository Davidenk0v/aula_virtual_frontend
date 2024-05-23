import { Component, Input } from '@angular/core';
import { CourseService } from '../../services/courses/course.service';
import { Course } from '../../interfaces/Course';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../interfaces/User';
import { JwtService } from '../../services/jwt/jwt.service';
import { MyDataComponent } from '../../components/profile/my-data/my-data.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyCoursesComponent } from '../../components/profile/my-courses/my-courses.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MyDataComponent, ReactiveFormsModule, FormsModule, MyCoursesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  courseList?:Course[]
  haveCourses:boolean = false;
  teacher?:User;
  idUser?:string;
  roleUser?:string;
  data:boolean = false;


  constructor(private courseService:CourseService, private userService:ProfileService, private jwtService:JwtService, private formBuild:FormBuilder){}



ngOnInit(): void {
  this.idUser = this.jwtService.getIdFromToken();
  this.getRole()
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getPerfilTeacher(this.idUser!)
}


getRole(){
  if(this.jwtService.getRoleFromToken()[2] == 'teacher_class_room') this.roleUser = 'Profesor'
  if(this.jwtService.getRoleFromToken()[2] == 'student_class_room') this.roleUser = 'Alumno'
}

changeView(data:boolean){
  this.data = data
}


  getPerfilTeacher(idTeacher:string):void{
    this.userService.getProfileById(idTeacher).subscribe({
      next: (cita) => {
        this.teacher = cita;
        console.log(cita)
      },
      error:(userData) => {
          console.error(userData)
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }

  
}
