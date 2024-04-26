import { HttpClientModule} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { RegisterService } from '../../services/auth/register.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../interfaces/Address';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { User } from '../../interfaces/User';

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

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService:RegisterService){}


  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    number: ['', [Validators.required]],
    country: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  });

private prepareRequest():RegisterRequest{
  this.address = {
    id: 0,
    street: this.registerForm.value.street ??'',
    city: this.registerForm.value.city ??'',
    number: this.registerForm.value.number ??'',
    country: this.registerForm.value.country ??'',
    postalCode: this.registerForm.value.postalCode ??'',
  };

  this.userRegister = {
    firstname: this.registerForm.value.firstName ??'',
    lastname: this.registerForm.value.lastName ??'',
    username: this.registerForm.value.username ??'',
    email: this.registerForm.value.email ??'',
    password: this.registerForm.value.password ??'',
    address: this.address
  };

  return this.userRegister;
}


  register() {
    if(this.registerForm.valid){

    this.prepareRequest();

    console.log(this.userRegister);

    if(this.registerForm.value.password === this.registerForm.value.password2){

    if (this.registerForm.valid) {

      this.registerService
        .register(this.prepareRequest())
        .subscribe({
          next: (userData) => {
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            this.router.navigateByUrl('/home');
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
}
