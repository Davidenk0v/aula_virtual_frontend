import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent {
  
  listTask:string[] = ['Sumar',"Restar","Dividir","Multiplicar"];
  
  @Input() lesson:string = "";
  @Input() topicName: string = "";

  task:string = "";

  

}
