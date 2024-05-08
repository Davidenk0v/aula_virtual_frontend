import { Component, OnInit } from '@angular/core'; 
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../interfaces/Course';
import { CourseService } from '../services/courses/course.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ListTaskComponent } from "./list-task/list-task.component";
import { Subject } from '../interfaces/Subject';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectsService } from '../services/subjects/subjects.service';
import { Lesson } from '../interfaces/Lesson';
@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
    imports: [PaymentComponent,FormsModule, RouterModule, AsyncPipe, ListTaskComponent,ReactiveFormsModule]
})
export class CourseComponent implements OnInit{

  subjects: Subject[] | undefined

  constructor(private subjectService:SubjectsService,private activateRoute: ActivatedRoute, private courseService:CourseService,private formBuild: FormBuilder) { }
  courseId?:number;
  courseInfo:Course | undefined;
  errorMessage?:string;

  
  subjectId?: number;
  

  subjectForm = this.formBuild.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getCourseInfo(this.courseId);
    this.getSubjects(this.courseId);
  }

   submenuAbierto = false;

    toggleSubmenu() {
        this.submenuAbierto = !this.submenuAbierto;
    }


    //Metodo modal
    abrirModal(id :number) {
      console.info(id)
      this.subjectId = id
      const modal = document.getElementById('modalEditarTema');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
      
    }
    
    cerrarModal() {
      const modal = document.getElementById('modalEditarTema');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }

    abrirModalDelete(id :number) {
      console.info(id)
      this.subjectId = id
      const modal = document.getElementById('alertModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
      
    }
    
    cerrarModalDelete() {
      const modal = document.getElementById('alertModal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }

  //Service 
  postSubject(){
    console.info(this.courseId)
    if (this.courseId) {
        this.courseService.postSubject(this.subjectForm.value as Subject,this.courseId).subscribe({
      next: (cita) => {
        console.info(cita)
        
      
      },
      error:(userData) => {
          console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
        if (this.courseId) {
          this.getSubjects(this.courseId);
        }
      }
    })
      }
    
    
  }

  subjectIdEdit(id: number){
    this.subjectId = id
  }

  getSubjects(courseId:number){
      this.subjectService.getSubjectsByCourseId(courseId).subscribe({
      next: (cita) => {
        console.info(cita)
        this.subjects = cita
      },
      error:(userData) => {
          console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
    
    
  }
  
  getCourseInfo(courseId:number){
      this.courseService.getCourseById(courseId).subscribe({
        next: (cita) => {
          console.info(cita)
          this.courseInfo = cita
        
        },
        error:(userData) => {
            console.log(userData)
            
        },
        complete:()=> {
          console.info("Completo")
        }
      })
    }


    editSubject(){
      console.info(this.subjectId)
      if (this.subjectId) {
        this.subjectService.editSubjectById(this.subjectId,this.subjectForm.value as Subject).subscribe({
          next: (cita) => {
            console.info(cita)
          },
          error:(userData) => {
              console.log(userData)
          },
          complete:()=> {
            console.info("Completo")
            if (this.courseId) {
              this.subjectForm.reset();
              this.cerrarModal();
              this.getSubjects(this.courseId);
            }
          }
        })
      }
    }
    

    deleteSubject(){
      console.info(this.subjectId)
      if (this.subjectId) {
        this.subjectService.deleteSubjectById(this.subjectId).subscribe({
          next: (cita) => {
            console.info(cita)
          },
          error:(userData) => {
              console.log(userData)
          },
          complete:()=> {
            console.info("Completo")
            if (this.courseId) {
              this.subjectForm.reset();
              this.cerrarModalDelete();
              this.getSubjects(this.courseId);
            }
          }
        })
      }
    }
}
