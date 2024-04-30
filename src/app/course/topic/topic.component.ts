import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTaskComponent } from '../list-task/list-task.component';
@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule,ListTaskComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

  lessons: string[] = ['operaciones basicas', 'raices', ' trigometria','operaciones basicas', 'raices', ' trigometria'];

  topic: string = "Matematicas";

  selectedComponent: string = "";
  showListTask: boolean = false;

  showComponent(item: string) {
    this.selectedComponent = item; 
  } 
}
