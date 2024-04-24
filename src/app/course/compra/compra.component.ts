import { Component } from '@angular/core';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  url:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPTZvHXqUKrFwXtWTABC_5Lt6DC1u4x2vag&s";
  precio:number = 299.99;
}
