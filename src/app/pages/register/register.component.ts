import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/User';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  constructor(private http: HttpClient, private router: Router) {

  }

  /**
   * Metodo que recoge los datos introducidos por el usuario y los envia mediante una peticion POST a la API.
*/}
