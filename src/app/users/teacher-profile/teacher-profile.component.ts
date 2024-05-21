import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { ProfileService } from '../../services/profile.service';
import { UploadProfileComponent } from "../../components/upload-profile/upload-profile.component";
import { RouterLink } from '@angular/router';
import { CreateCourseComponent } from "../../pages/create-course/create-course.component";
import { DeleteCourseComponent } from "../../components/delete-course/delete-course.component";
import { JwtService } from '../../services/jwt/jwt.service';
import { User } from '../../interfaces/User';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';

@Component({
    selector: 'app-teacher-profile',
    standalone: true,
    templateUrl: './teacher-profile.component.html',
    styleUrl: './teacher-profile.component.css',
    imports: [UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent, SuccessMessageComponent]
})
export class TeacherProfileComponent implements OnInit{

  constructor(private courseService:CourseService, private userService:ProfileService, private jwtService:JwtService){}
  idTeacher:string='';
  teacher?:User;
  editMessage?:string;

  ngOnInit(): void {
    this.idTeacher = this.jwtService.getIdFromToken();
    this.getPerfilTeacher(this.idTeacher)
    this.getCoursesTeacher(this.idTeacher);
    if (sessionStorage.getItem('edit')) {
      this.editMessage = sessionStorage.getItem('edit') ?? '';
      setTimeout(() => {
        this.editMessage = '';
    }, 10000);
    }
  }


  haveCourses?:boolean = true
  idCourse?:number
  courseList?:Course[]
  editOn: boolean = false;
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
        this.getCoursesTeacher(this.idTeacher);
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
    this.getPerfilTeacher(this.idTeacher);
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
      this.getPerfilTeacher(this.idTeacher);
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

  getCoursesTeacher(idTeacher:string):void{
    this.courseService.getAllCoursesByUser(idTeacher).subscribe({
      next: (cita) => {
        this.courseList = cita
  
      },
      error:(userData) => {
        this.haveCourses = false
        console.error(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }

  getPerfilTeacher(idTeacher:string):void{
    this.userService.getProfileById(idTeacher).subscribe({
      next: (cita) => {
        this.teacher = cita;
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



