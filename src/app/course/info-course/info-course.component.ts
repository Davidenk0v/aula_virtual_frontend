import { Component } from '@angular/core';

@Component({
  selector: 'app-info-course',
  standalone: true,
  imports: [],
  templateUrl: './info-course.component.html',
  styleUrl: './info-course.component.css'
})
export class InfoCourseComponent {
  name: String = "Matematicas: de Cero a Experto"
  score: number = 4;
  description:String ="Curso para aprender Matematicas fundamentales...";
  number_ratings:String = "8.000.000";
  creator:String ="Elon Musk";
  start_date: String = "11/09/2024";
  finish_date:String = "25/05/2025";
}
