import { Component } from '@angular/core';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  items: string[] = ['operaciones basicas', 'raices', ' trigometria','operaciones basicas', 'raices', ' trigometria'];
  topic: string = "Matematicas";
}
