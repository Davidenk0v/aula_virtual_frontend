import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  url:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPTZvHXqUKrFwXtWTABC_5Lt6DC1u4x2vag&s";
  precio:number = 299.99;
}
