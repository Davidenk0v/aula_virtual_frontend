import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { UserProfile } from '../../interfaces/Profile';
import { CourseService } from '../../services/courses/course.service';
import { ProfileService } from '../../services/profile.service';
import { UploadProfileComponent } from '../../components/upload-profile/upload-profile.component';
import { RouterLink } from '@angular/router';
import { CreateCourseComponent } from '../../pages/create-course/create-course.component';
import { DeleteCourseComponent } from '../../components/delete-course/delete-course.component';
import { JwtService } from '../../services/jwt/jwt.service';
import { Course } from '../../interfaces/Course';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CarouselComponentComponent, UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(private courseService:CourseService, private userService:ProfileService, private jwtService:JwtService){}
  ngOnInit(): void {
    this.idUser = this.jwtService.getIdFromToken();
    this.getCoursesTeacher();
    this.getPerfilUser(this.idUser);
  }

  idUser:string='';
  haveCourses?:boolean = true
  idCourse?:number
  courseList?:Course[]
  editOn: boolean = false;
  perfil? : User
  popUpEdit : boolean = false;


  popUpDelete : boolean = false;
  onEnter(event: KeyboardEvent) {
    // Verifica si la tecla presionada es "Enter" (código 13)
    if (event.key === "Enter") {
      // Ejecuta la lógica que deseas cuando se presiona "Enter"
      
    }
  }

  borrar(){
    
    if (this.idCourse) {
      this.courseService.deleteCourseById(this.idCourse).subscribe({
      next: (data) => {
        console.info(data);
      },error:(data) => {
        console.info(data, "Error")
      },
      complete:()=> {
        console.info("Completo")  
        this.abrirModal();
        this.getCoursesTeacher();
      }
    });
    }
  }

  cambiarIdCourse(course: number){
    this.idCourse = course
    console.info(this.idCourse)
  }
  onProfileEdited(isEdited: boolean): void {
    this.popUpEdit = isEdited;
    console.info(this.popUpEdit)
    this.cerrarModalPerfil();
   this.getPerfilUser(this.idUser);
  }

  abrirModalPerfil() {
    const modal = document.getElementById('miModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }


  cerrarModalPerfil() {
    const modal = document.getElementById('miModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  

  abrirModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  
  cerrarModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  
  
  
  editMode(): void{
    this.editOn = !this.editOn
    
  }

  pupUpEditProfile(): void{
    this.popUpEdit = !this.popUpEdit
    if (this.popUpEdit==true) {
      this.abrirModalPerfil();
    }
  }
  getCoursesTeacher():void{
    this.courseService.getAllCoursesTeacher(this.idUser).subscribe({
      next: (cita) => {
        console.info(cita)
        this.courseList = cita
  
      },
      error:(userData) => {
        this.haveCourses = false
        console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }

  getPerfilUser(id:string):void{
    this.userService.getProfileById(id).subscribe({
      next: (cita) => {
        console.info(cita)
        this.perfil = cita;
      },
      error:(userData) => {
          console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }
}
