import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userName: string = "";
  email: string = "";
  password: string = "";

  registerUser() {
    localStorage.setItem("Username", this.userName);
    localStorage.setItem("email", this.email);
    localStorage.setItem("password", this.password);
  }

}
