import { Component } from '@angular/core';
import { User } from '../../interfaces/User';
import { Course } from '../../interfaces/Course';
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

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CarouselComponentComponent, UploadProfileComponent, RouterLink, CreateCourseComponent, DeleteCourseComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(private courseService: CourseService, private userService: ProfileService, private jwtService: JwtService) { }
  ngOnInit(): void {
    this.email = this.jwtService.getEmailFromToken();
    this.getCoursesTeacher();
    this.getPerfilTeacher(this.email);
    // TODO se mantiene esta id numerica por el momento, sustituir por la id de busqueda preferida
    this.downloadImage(1);
  }

  email: string = '';
  haveCourses?: boolean = true
  idCourse?: number
  courseList?: Course[]
  editOn: boolean = false;
  perfil?: UserProfile
  popUpEdit: boolean = false;

  payload: any;
  imageUrl: any;
  imageCourseurl:any;


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
          this.getCoursesTeacher();
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
    // this.getPerfilTeacher();
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



  editMode(): void {
    this.editOn = !this.editOn

  }

  pupUpEditProfile(): void {
    this.popUpEdit = !this.popUpEdit
    if (this.popUpEdit == true) {
      this.abrirModalPerfil();
    }
  }
  getCoursesTeacher(): void {
    this.courseService.getAllCoursesTeacher(this.email).subscribe({
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

  getPerfilTeacher(username: string): void {
    this.userService.getProfileByUsername(username).subscribe({
      next: (cita) => {
        console.info(cita)
      },
      error: (userData) => {
        console.log(userData)

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
    // TODO se mantiene esta id numerica por el momento, sustituir por la id de busqueda preferida
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
    this.userService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data", data);
        this.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completa descarga imagen curso")
        localStorage.removeItem("fileType");
      }
    });
  }

  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImageCourse(user: number) {
    this.courseService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data", data);
        this.imageCourseurl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completa descarga imagen curso")
        localStorage.removeItem("fileType");
      }
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

  setDefaultImage() {
    console.log("Se ha pulsado el boton")
    // TODO se mantiene esta id numerica por el momento, sustituir por la id de busqueda preferida
    this.userService.setDefaultProfileImage(1).subscribe({
      next: (cita: any) => {
        console.info(cita)
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.info("Completo")
        window.location.reload();
        localStorage.removeItem("fileType");
        //this.getPerfilTeacher(this.email)
      }
    });
  }

}
