import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../interfaces/Profile';
import { UploadProfileComponent } from "../../components/upload-profile/upload-profile.component";
import { RouterLink } from '@angular/router';
import { CreateCourseComponent } from "../../pages/create-course/create-course.component";
import { DeleteCourseComponent } from "../../components/delete-course/delete-course.component";
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
    selector: 'app-teacher-profile',
    standalone: true,
    templateUrl: './teacher-profile.component.html',
    styleUrl: './teacher-profile.component.css',
    imports: [UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent]
})
export class TeacherProfileComponent implements OnInit{

  constructor(private courseService:CourseService, private userService:ProfileService, private jwtService:JwtService){}
  email:string='';
  username:string=''
  ngOnInit(): void {
    this.username = this.jwtService.getUsernameFromToken();
    //this.getCoursesTeacher();
    this.getPerfilTeacher(this.username)
  }


  haveCourses?:boolean = true
  idCourse?:number
  courseList?:Course[]
  editOn: boolean = false;
  perfil? : UserProfile
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
    //this.getPerfilTeacher();
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
    this.courseService.getAllCoursesTeacher(1).subscribe({
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

  getPerfilTeacher(username:string):void{
    this.userService.getProfileByUsername(username).subscribe({
      next: (cita) => {
        console.info(cita)
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



