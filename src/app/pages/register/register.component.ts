import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/requests/RegisterRequest';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../interfaces/Address';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { AuthService } from '../../services/auth/auth.service';
import { EmailService } from '../../services/emails/email.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, FormsModule, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  address?: Address;
  userRegister?: RegisterRequest;
  errorMessage?:string;
  successMessage?:string;
  @Input() role!:string;

  constructor(private formBuilder:FormBuilder, private router:Router, private authService:AuthService, private emailService:EmailService){}


  registerForm = this.formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    roles: [[''], [Validators.required]],
  });


  register() {
    if(this.registerForm.valid){
      this.registerForm.value.roles = [this.role];
    if(this.registerForm.value.password === this.registerForm.value.password2){

    if (this.registerForm.valid) {

      this.authService
        .register(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: (userData) => {
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.error(errorData);
          },
          complete: () => {
            this.sendEmail()
            this.router.navigate(['/verify', this.registerForm.value.email]);
            this.registerForm.reset();
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }else {
    this.errorMessage = "Las contraseñas deben coincidir"
  }
}else {
 this.errorMessage = "Debe completar todos los campos correctamente";
}
}

sendEmail(){
  this.emailService.sendVerifyEmail(this.registerForm.value.email as string).subscribe({
    next: (userData) => {
      console.info(userData)
    },
    error: (errorData) => {
      this.errorMessage = errorData;
      console.error(errorData);
    },
    complete: () => {
      this.emailService.verifyEmail(this.registerForm.value.email ?? '')
      this.router.navigate(['/verify', this.registerForm.value.email]);
      this.registerForm.reset();
    },
  });
}



}
