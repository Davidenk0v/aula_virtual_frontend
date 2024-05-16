import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/emails/email.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  errorMessage?:string;
  successMessage?:string;


  constructor(private formBuilder:FormBuilder, private emailService:EmailService){}

  emailForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]]
  })

  sendMail(){
    if(this.emailForm.valid){
      this.emailService.forgotPassword(this.emailForm.value.email as string).subscribe({
        next: (response) => {
          this.errorMessage = undefined
            this.successMessage=response.OK
            
        },
        error: (error) => {
          this.errorMessage=error
        },
        complete: ()=> {
          console.info("Done")
          this.emailForm.reset();
          this.successMessage= "Se ha enviado un enlace a su correo"
        }
      })
    }else {
      this.errorMessage = "Debe indicar un email válido"
    }
  }
}
