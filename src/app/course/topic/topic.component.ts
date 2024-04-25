import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  items: string[] = ['operaciones basicas', 'raices', ' trigometria','operaciones basicas', 'raices', ' trigometria'];
  topic: string = "Matematicas";
  selectedComponent: string = "";

  showComponent(item: string) {
    this.selectedComponent = item; 
  }
}
