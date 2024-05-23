import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { Lesson } from '../../interfaces/Lesson';


@Component({
  selector: 'app-lessons-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lessons-edit.component.html'
})
export class LessonsEditComponent {

  lesson = this.formBuilder.group({
    name: ["", Validators.required],
    contenido: ["", Validators.required],
    description: ["", Validators.required]
  });


  constructor(private formBuilder:FormBuilder,private service:LessonPostService){}


  editLesson(){
    this.service.putLessons(5,this.lesson.value as Lesson).subscribe({
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
