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
import { User } from '../../interfaces/User';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
  imports: [UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent, SuccessMessageComponent]
})
export class TeacherProfileComponent implements OnInit {

  constructor(private courseService: CourseService, private userService: ProfileService, private jwtService: JwtService) { }
  email: string = '';
  username: string = ''
  teacher?: User;
  editMessage?: string;

  payload: any;
  imageUrl: any;

  ngOnInit(): void {
    this.email = this.jwtService.getEmailFromToken();
    this.getCoursesTeacher(this.email);
    this.getPerfilTeacher(this.email)
    if (sessionStorage.getItem('edit')) {
      this.editMessage = sessionStorage.getItem('edit') ?? '';
      setTimeout(() => {
        this.editMessage = '';
      }, 10000);
    }
    console.log("Email:", " '" + this.email + "'")
    this.downloadImage(1);
  }


  haveCourses?: boolean = true
  idCourse?: number
  courseList?: Course[]
  editOn: boolean = false;
  popUpEdit: boolean = false;


  popUpDelete: boolean = false;
  onEnter(event: KeyboardEvent) {
    // Verifica si la tecla presionada es "Enter" (código 13)
    if (event.key === "Enter") {
      // Ejecuta la lógica que deseas cuando se presiona "Enter"

    }
  }

  borrar() {

    if (this.idCourse) {
      this.courseService.deleteCourseById(this.idCourse).subscribe({
        next: (data) => {
          console.info(data);
        }, error: (data) => {
          console.info(data, "Error")
        },
        complete: () => {
          console.info("Completo")
          this.abrirModal();
          this.getCoursesTeacher(this.email);
        }
      });
    }
  }

  cambiarIdCourse(course: number) {
    this.idCourse = course
    console.info(this.idCourse)
  }
  onProfileEdited(isEdited: boolean): void {
    this.popUpEdit = isEdited;
    console.info(this.popUpEdit)
    this.cerrarModalPerfil();
    this.getPerfilTeacher(this.username);
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
      this.getPerfilTeacher(this.email);
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



  editMode(): void {
    this.editOn = !this.editOn

  }

  pupUpEditProfile(): void {
    this.popUpEdit = !this.popUpEdit
    if (this.popUpEdit == true) {
      this.abrirModalPerfil();
    }
  }

  getCoursesTeacher(email: string): void {
    this.courseService.getAllCoursesTeacher(email).subscribe({
      next: (cita) => {
        console.info(cita)
        this.courseList = cita

      },
      error: (userData) => {
        this.haveCourses = false
        console.log(userData)

      },
      complete: () => {
        console.info("Completo")
      }
    })
  }

  getPerfilTeacher(email: string): void {
    this.userService.getProfileByUsername(email).subscribe({
      next: (cita) => {
        this.teacher = cita;
      },
      error: (userData) => {
        console.error(userData)
      },
      complete: () => {
        console.info("Completo")
      }
    })
  }
  
  /**
   * Selecciona el archivo y valida si es admitido.
   * @param event 
   */
  setFile(event: any) {
    let temp = <File>event.target.files[0];
    console.log("payload ", temp.name);
    console.log('size', temp.size);
    console.log('type', temp.type);
    switch (temp.type) {
      case "image/png":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpeg":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpg":
        this.payload = <File>event.target.files[0];
        break;
      default:
        this.abrirModalFormat();
        break;
    }
  }

  /**
   * Envia el archivo a la API.
   */
  uploadImage(): void {
    this.userService.setProfileImage(1, this.payload).subscribe({
      next: (cita) => {
        console.info(cita)

      },
      error: (userData) => {
        this.haveCourses = false
        console.log(userData)
      },
      complete: () => {
        console.info("Completo")
        window.location.reload();
        //this.getPerfilTeacher(this.email)
      }
    });
  }

  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImage(user: number) {
    this.userService.getProfileImage(user).subscribe((res: Blob | MediaSource) => {
      console.log("res ", res)
      this.imageUrl = URL.createObjectURL(res);
    });
  }

  abrirModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  cerrarModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}



