import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../interfaces/User';
import { UserProfile } from '../../interfaces/Profile';
import { UploadProfileComponent } from "../../components/upload-profile/upload-profile.component";
import { RouterLink } from '@angular/router';
import { CreateCourseComponent } from "../../pages/create-course/create-course.component";
import { DeleteCourseComponent } from "../../components/delete-course/delete-course.component";

@Component({
    selector: 'app-teacher-profile',
    standalone: true,
    templateUrl: './teacher-profile.component.html',
    styleUrl: './teacher-profile.component.css',
    imports: [UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent]
})
export class TeacherProfileComponent implements OnInit{

  constructor(private courseService:CourseService, private userService:ProfileService){}
  ngOnInit(): void {
    this.getCoursesTeacher();
    this.getPerfilTeacher();
  }

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


  cambiarIdCourse(course: number){
    this.idCourse = course
    console.info(this.idCourse)
    this.pupUpDeleteCourse();
  }
  onProfileEdited(isEdited: boolean): void {
    this.popUpEdit = isEdited;
    console.info(this.popUpEdit)
    this.getPerfilTeacher();
  }

  onCourseDelete(isEdited: boolean): void {
    this.popUpDelete = isEdited;
    console.info(this.popUpDelete)
    this.getCoursesTeacher();
  }

  editMode(): void{
    this.editOn = !this.editOn
    console.info(this.editOn)
  }

  pupUpDeleteCourse(): void{
    this.popUpDelete = !this.popUpDelete
    console.info(this.popUpDelete)
  }
  pupUpEditProfile(): void{
    this.popUpEdit = !this.popUpEdit
    console.info(this.popUpEdit)
  }
  getCoursesTeacher():void{
    this.courseService.getAllCoursesTeacher(2).subscribe({
      next: (cita) => {
        console.info(cita)
        this.courseList = cita
  
      },
      error:(userData) => {
          console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }

  getPerfilTeacher():void{
    this.userService.getProfileById(2).subscribe({
      next: (cita) => {
        console.info(cita)
        this.perfil = cita
        console.info(this.perfil)
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



