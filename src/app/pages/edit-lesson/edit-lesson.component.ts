import { Component, OnInit } from '@angular/core';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { Lesson } from '../../interfaces/Lesson';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent implements OnInit {

  errorMessage?: string;

  idCourse!:number;
  idSubject!: number;
  idLesson!: number;
  constructor(
    private formBuilder: FormBuilder, 
    private lessonsPostComponent: LessonPostService, 
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  payload: any;

  ngOnInit(): void {
    this.idLesson = Number(this.activateRoute.snapshot.paramMap.get('idLesson'));
    this.idCourse = Number(this.activateRoute.snapshot.paramMap.get('idCourse'));

    console.log("idSubject", this.idLesson);

  }

  // Este objeto es el que luego se mandrá a la base de datos
  editLessonForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

 /**
   * Actualiza una lección y si se completa se redirigira a la tarea editada.
   * @param event 
   */
  updateLesson() {
    if (this.editLessonForm.valid && this.idLesson)
      this.lessonsPostComponent.putLessons(this.idLesson, this.editLessonForm.value as Lesson)
        .subscribe({
          next: (data) => {
            console.info(data)
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.editLessonForm.value as Lesson)

          },
          complete: () => {
            this.editLessonForm.reset();
            if (this.payload) {
              this.uploadFile();
              this.router.navigate([`/lesson/${this.idCourse}/${this.idLesson}`]);
            } else {
              this.router.navigate([`/lesson/${this.idCourse}/${this.idLesson}`]);
            }
          },
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
  /**
   * Abre el modal de error en pantalla.
   */
  abrirModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  /**
   * Cierra el modal de error en pantalla.
   */
  cerrarModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

}
