import { Component, Input, OnInit } from '@angular/core';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { Lesson } from '../../interfaces/Lessons';
import { ActivatedRoute,Router } from '@angular/router';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit{
  
  constructor(
    private lessonService: LessonPostService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}
 
  errorMessage: any;
  lesson!:Lesson;
  idCourse!:number;
  idLesson!:number;

  @Input() id!: string;

  ngOnInit(): void {
    const idString = this.activatedRoute.snapshot.paramMap.get('idLesson'); 
    const idCourseString = this.activatedRoute.snapshot.paramMap.get('idCourse');

    const idNumber = parseInt(`${idString}`);
    this.idLesson = idNumber;

    const idCourseNumber = parseInt(`${idCourseString}`);
    this.idCourse = idCourseNumber;

     this.lessonService.getLesson(this.idLesson)
     .subscribe({
      next: (lessonData) => {
        console.info(lessonData)
        this.lesson = lessonData["Id encontrado "];
      },
      error: (errorData) => {
        this.errorMessage = errorData; 
      },
      complete: () => { 
        //this.router.navigateByUrl('/subject/' + this.idSubject);
      },
    })
  }

   /**
 * Descarga el archivo desde la API.
 * @param leccion La id del usuario.
 */
   downloadFile(leccion: Lesson) {
    this.lessonService.getFile(leccion.idLesson).subscribe({
      next: (data: any) => {
        console.info("data", data);
        const mimeType = localStorage.getItem("fileType");
          const parts = mimeType!.split('/');
          const fileType = parts[1];
          FileSaver.saveAs(data, leccion.contenido + "." + fileType);
          // Version que guarda el nombre de la bbdd
          //FileSaver.saveAs(data, leccion.contenido);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
        localStorage.removeItem("fileType");
      }
    });
  }

  volverAlCurso(){
    this.router.navigate(['/course/' +  this.idCourse]); 

  }
}