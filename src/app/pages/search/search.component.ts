import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Course } from '../../interfaces/Course';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  courseList?:Course[]
  mensajeBusqueda : string = "";
  mensaje : string = "";

  result?:number
  constructor(private service: SearchService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.service.verDatos().subscribe({
      next: (cita) => {
        console.info(cita)
        this.courseList = cita
        this.result = this.courseList.length
      
      },
      error:(userData) => {
          console.log(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }

    
  });
  this.mensajeBusqueda = this.service.getString();
  }

  onEnter(event: KeyboardEvent) {
    // Verifica si la tecla presionada es "Enter" (código 13)
    if (event.key === "Enter") {
      // Ejecuta la lógica que deseas cuando se presiona "Enter"
      this.courseList = undefined
      this.service.setString(this.mensaje);
      this.ngOnInit();
      console.info(this.mensaje)
      console.info(this.mensajeBusqueda)
    }
  }


}
