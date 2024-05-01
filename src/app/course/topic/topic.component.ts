import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListTaskComponent } from '../list-task/list-task.component';
import { Course } from '../../interfaces/Course';
@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule,ListTaskComponent, AsyncPipe],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

  lessons: string[] = ['operaciones basicas', 'raices', ' trigometria','operaciones basicas', 'raices', ' trigometria'];

  @Input() courseInfo?:Course;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  selectedComponent: string = "";
  showListTask: boolean = false;

  showComponent(component: string){
    this.selectedComponent = component;
    this.showListTask = true;
  }
}
