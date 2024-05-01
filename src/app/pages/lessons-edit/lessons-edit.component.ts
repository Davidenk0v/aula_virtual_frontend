import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { lessonPostI } from '../../modelos/class.inteface';

@Component({
  selector: 'app-lessons-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lessons-edit.component.html',
  styleUrl: './lessons-edit.component.css'
})
export class LessonsEditComponent {

  lesson = this.formBuilder.group({
    name: ["", Validators.required],
    contenido: ["", Validators.required],
    description: ["", Validators.required]
  });


  constructor(private formBuilder:FormBuilder,private service:LessonPostService){}


  post(){
    this.service.putLessons(5,this.lesson.value as lessonPostI).subscribe({
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
