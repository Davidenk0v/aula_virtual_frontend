import { Component, OnInit } from '@angular/core';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import {  FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { Lesson } from '../../interfaces/Lessons';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css',
  providers: [FormBuilder] // Provide FormBuilder explicitly
})
export class CreateLessonComponent implements OnInit {

  errorMessage?: string;
  idCourse!:number;
  idSubject!: number;
  idLesson!: number;
  router: any;
  constructor(
    private formBuilder: FormBuilder, 
    private lessonsPostComponent: LessonPostService, 
    private activateRoute: ActivatedRoute,
    private routerr: Router
  ) { }

  payload: any;

  ngOnInit(): void {
    this.idSubject = Number(this.activateRoute.snapshot.paramMap.get('idSubject'));
    this.idCourse = Number(this.activateRoute.snapshot.paramMap.get('courseId'));
 
    console.log("idSubject", this.idSubject);
  }

  // Este objeto es el que luego se mandrá a la base de datos
  newLessonForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  addLesson() {
    if (this.newLessonForm.valid && this.idSubject)
      this.lessonsPostComponent.postLessons(this.idSubject, this.newLessonForm.value as Lesson)
        .subscribe({
          next: (data) => {
            console.info(data)
            let json = data["Leccion subido"];
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.newLessonForm.value as Lesson)

          },
          complete: () => {
            this.newLessonForm.reset();
            if (this.payload) {
              this.getLastId(this.idSubject)
            } else {
              this.router.navigateByUrl('/subject/' + this.idSubject);
            }
          },
        })
  }

  /**
   * Envia el archivo a la API.
   */
  getLastId(idSubject: number): void {
    this.lessonsPostComponent.getIdLastLessond(idSubject).subscribe({
      next: (cita: Lesson) => {
        console.info(cita)
        this.idLesson = cita.idLesson;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.info("completada peticion ID")
        this.uploadFile();
      }
    });
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
      case "application/csv":
        this.payload = <File>event.target.files[0];
        break;
      case "application/pdf":
        this.payload = <File>event.target.files[0];
        break;
      case "application/txt":
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
  uploadFile(): void {
    this.lessonsPostComponent.setFile(this.idLesson, this.payload).subscribe({
      next: (cita) => {
        console.info(cita)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.info("Completa subida imagen perfil")
        this.router.navigateByUrl('/subject/' + this.idSubject);
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

  volverACurso(){
    this.routerr.navigateByUrl("/course" + this.idCourse);
  }
}