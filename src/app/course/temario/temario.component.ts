import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-temario',
  standalone: true,
  imports: [ 
    CommonModule 
  ],
  templateUrl: './temario.component.html',
  styleUrl: './temario.component.css'
})
export class TemarioComponent {
  items: string[] = ['operaciones basicas', 'raices', ' trigometria','operaciones basicas', 'raices', ' trigometria'];
  tema: string = "Matematicas";
}
