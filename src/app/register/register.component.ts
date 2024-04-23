import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../entitys/Usuario.entity';
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  usuario:Usuario;

  constructor(private http: HttpClient, private router: Router) {
    this.usuario = new Usuario();
  }

  onRegister() {
    debugger;
    const headers = new HttpHeaders();
    const body = {userName: this.usuario.userName,email: this.usuario.email, password: this.usuario.password}
    this.http.post<any>("https://6627c6e6b625bf088c09bcf7.mockapi.io/api/v1/virtualclass/users", body, { headers }).subscribe((res:any)=>{
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
