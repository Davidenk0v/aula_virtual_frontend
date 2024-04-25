import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage:string = '';

  loginForm= this.formBuilder.group({
    username:['',[Validators.required]],
    password:['', [Validators.required]]
  });

  private rememberMe: boolean = false;

  constructor(private http: HttpClient, private router: Router, private formBuilder:FormBuilder, private loginService: LoginService) {
  }

  /**
   * Metodo que si el recuerdame esta en true recoge los valores del localstorage.
   */
  ngOnInit(): void {
    if (localStorage.getItem("rememberMe") == "true") {
      this.loginForm.value.username = localStorage.getItem("username");
      this.loginForm.value.password = localStorage.getItem("password");
    }
  }

  onLogin() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Completado");
          if (this.rememberMe) {
            //Si el usuario marca el recuerdame se guardan los datos en el localstorage
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("username", this.loginForm.value.username ?? '');
            localStorage.setItem("password", this.loginForm.value.password ?? '');
          } else {
            localStorage.setItem("rememberMe", "false");
          }
          
          this.loginForm.reset();
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
    } 
  }
}
