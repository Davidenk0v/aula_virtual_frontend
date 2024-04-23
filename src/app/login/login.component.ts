import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Username: string = "";
  password: string = "";
  remenberMe: boolean = false;

  constructor() {
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
   * TODO implementar llamada a la API con la verificacion del usuario.
   */
  loginUser() {
    console.log(this.Username + this.password)
    localStorage.setItem("Username", this.Username);
    // Implementar un metodo para codificar la contraseña para almacenarla localmente?
    localStorage.setItem("password", this.password);
    if (this.remenberMe) {
      localStorage.setItem("remenberMe", "true");
    } else {
      localStorage.setItem("remenberMe", "false");
    }
  }

}
