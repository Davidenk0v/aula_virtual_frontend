import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../entitys/Usuario.entity';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {
    this.usuario = new Usuario();
  }

  /**
   * Metodo que recoge los datos introducidos por el usuario y los envia mediante una peticion POST a la API.
   */
  onRegister() {
    debugger;
    const headers = new HttpHeaders();
    const body = {
      userName: this.usuario.userName,
      firstName: this.usuario.firstName,
      lastName: this.usuario.lastName,
      email: this.usuario.email,
      address: this.usuario.address,
      password: this.usuario.password
    }
    this.http.post<any>("https://6627c6e6b625bf088c09bcf7.mockapi.io/api/v1/virtualclass/users", body, { headers }).subscribe((res: any) => {
      // Falta implementar la respuesta condicional de la API en funcion del estado de la peticion.
      if (res != null) {
        alert("Usuario registrado.");
        // Colocar la pagina a la que envia al iniciar sesion.
        // this.router.navigateByUrl("/usuario")
      } else {
        alert(res.message)
      }
    }, error => {
      alert("Error from API")
    })
  }

}
