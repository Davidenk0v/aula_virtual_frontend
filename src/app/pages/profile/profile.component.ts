import { Component, Input } from '@angular/core';
import { CourseService } from '../../services/courses/course.service';
import { Course } from '../../interfaces/Course';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../interfaces/User';
import { JwtService } from '../../services/jwt/jwt.service';
import { MyDataComponent } from '../../components/profile/my-data/my-data.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyCoursesComponent } from '../../components/profile/my-courses/my-courses.component';
import { ZoomComponent } from "../zoom/zoom/zoom.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [MyDataComponent, ReactiveFormsModule, FormsModule, MyCoursesComponent, ZoomComponent]
})
export class ProfileComponent {

  courseList?:Course[]
  haveCourses:boolean = false;
  teacher?:User;
  idUser?:string;
  roleUser?:string;
  data:string = "cursos";
  imageUrl: any;

  constructor(private courseService:CourseService, private userService:ProfileService, private jwtService:JwtService, private formBuild:FormBuilder){}



ngOnInit(): void {
  this.idUser = this.jwtService.getIdFromToken();
  this.getRole()
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getPerfilTeacher(this.idUser!)
  this.downloadImage(this.idUser!)
  console.log(this.jwtService.getRoleFromToken())
}


getRole(){
  if(this.jwtService.getRoleFromToken()[2] == 'teacher_class_room') this.roleUser = 'Profesor'
  if(this.jwtService.getRoleFromToken()[0] == 'student-class-room') this.roleUser = 'Alumno'
}

changeView(data:string){
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

  /**
     * Descarga el archivo desde la API.
     * @param user La id del usuario.
     */
  downloadImage(user: string) {
    console.log("Usuario ID", user);
    
    this.userService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data URL", data);
        this.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
      }
    });
  }
  
}
