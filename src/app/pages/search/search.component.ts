import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { course } from '../../modelos/class.inteface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  courseList?:course[]

  result?:number
  constructor(private service: SearchService){}
  ngOnInit(): void {
    this.service.verDatos("curso").subscribe({
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
  }


}
