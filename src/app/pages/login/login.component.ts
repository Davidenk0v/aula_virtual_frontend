import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , HttpClientModule, RouterModule, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage:string = '';
  successMessage:string = '';
  isUserLogged: boolean = false
  username: string = ""

  loginForm= this.formBuilder.group({
    username:['',[Validators.required]],
    password:['', [Validators.required]]
  });

  private rememberMe: boolean = false;

  constructor(private http: HttpClient, 
    private router: Router, 
    private formBuilder:FormBuilder, 
    private loginService: LoginService, 
    private authService: AuthService) {
  }

  /**
   * Metodo que si el recuerdame esta en true recoge los valores del localstorage.
   */
  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            this.isUserLogged = true;
            if(this.isUserLogged){
              this.username = this.authService.getUsername();
              console.log(this.username);
            }
          }
        }
      });
  }

  keycloakLogin() {
    this.authService.login();
  }







  onLogin() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/home');
          console.log(this.loginForm.value);
        },
        error: (error) => {
          this.errorMessage = error;
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
