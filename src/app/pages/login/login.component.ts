import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

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
  userLoggedIn:boolean = false;

  constructor(private http: HttpClient, 
    private router: Router, 
    private formBuilder:FormBuilder, 
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("verify")){
      this.successMessage = sessionStorage.getItem("verify") ?? ''
    }
    this.authService.loggedIn$.subscribe((loggedIn)=> {
      if(loggedIn){
          this.userLoggedIn = true;
      }else {
          this.userLoggedIn = false;
      }
    })
    
  }

  /**
   * Metodo que si el recuerdame esta en true recoge los valores del localstorage.
   */
  
  onLogin() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          this.router.navigateByUrl('/home');
          sessionStorage.setItem('token', data.access_token)
          sessionStorage.removeItem("verify")
        },
        error: (error) => {
          this.errorMessage = error;
          console.error(error);
        },
        complete: () => {
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
      this.errorMessage = "Debe rellenar todos los campos"
      this.loginForm.markAllAsTouched();
    } 
  }
}
