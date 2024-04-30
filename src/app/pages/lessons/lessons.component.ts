import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { lessonPostI } from '../../modelos/class.inteface';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {

  lesson = this.formBuilder.group({
    name: ["", Validators.required],
    contenido: ["", Validators.required],
    description: ["", Validators.required]
  });


  constructor(private formBuilder:FormBuilder,private service:LessonPostService){}


  post(){
    this.service.postLessons(3,this.lesson.value as lessonPostI).subscribe({
      next: (data) => {
        console.info(data);
      },error:(data) => {
        console.info(data, "Error")
      },
      complete:()=> {
        console.info("Completo")        
      }
    });
  }
}
