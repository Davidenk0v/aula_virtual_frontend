import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {

  lesson = this.formBuilder.group({
    dia: [5, Validators.required],
    mes: [0, Validators.required],
    horaInicio: [0, Validators.required],
    horaFinal: [0, Validators.required],
  });


  constructor(private formBuilder:FormBuilder){}

}
