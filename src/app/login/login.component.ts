import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../entitys/Usuario.entity';
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: Usuario;
  remenberMe: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.usuario = new Usuario();
    this.onInit();
  }

  onInit() {
    if (localStorage.getItem("remenberMe") == null) {
      localStorage.setItem("remenberMe", "false");
    } else {
      let readValue = localStorage.getItem("remenberMe");
      if (readValue?.match("true")) {
        this.remenberMe = true;
      } else {
        this.remenberMe = false;
      }
    }
  }

  /**
   * Metodo que recoge la informacion del usuario y guarda si se debe recordar la sesion o no para iniciar automaticamente.
   * Los dato actualmente son almacenados localmente.
   * 
   * TODO Implementacion sin testear del GET
   */
  OnLogin() {
    const headers = new HttpHeaders();
    const body = {userName: this.usuario.userName, password: this.usuario.password}
    this.http.post<any>("https://6627ba09b625bf088c097e87.mockapi.io/api/v1/users/user/", body, { headers }).subscribe((res:any)=>{
      alert(res)
      if (res != null) {
        alert("Login Success");
        // Colocar la pagina a la que envia al iniciar sesion.
        // this.router.navigateByUrl("/usuario")
      } else {
        alert(res.message)
      }
    }, error => {
      alert("Error from API")
    })

    localStorage.setItem("Username", this.usuario.userName);
    // Implementar un metodo para codificar la contraseña para almacenarla localmente?
    localStorage.setItem("password", this.usuario.password);
    if (this.remenberMe) {
      localStorage.setItem("remenberMe", "true");
    } else {
      localStorage.setItem("remenberMe", "false");
    }
  }

}
