import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/emails/email.service';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {

  errorMessage?:string;
  successMessage?:string;
  idUser!:string;

  constructor(
    private formBuilder:FormBuilder, 
    private emailService:EmailService,
    private activateRoute:ActivatedRoute,
    private router:Router
  ){}

  passwordForm = this.formBuilder.group({
    password:['', [Validators.required]],
    password2:['', [Validators.required]]
  })

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.idUser = this.activateRoute.snapshot.params['id'];
  }

  setPassword(){
    if(this.passwordForm.valid && this.passwordForm.value.password === this.passwordForm.value.password2){
      this.emailService.setNewPassword(this.passwordForm.value.password as string, this.idUser).subscribe({
        next: (response) => {
          this.errorMessage = undefined
            this.successMessage=response.OK
            
        },
        error: (error) => {
          this.errorMessage=error
        },
        complete: ()=> {
          console.info("Done")
          this.successMessage= "Contraseña actualizada correctamente"
          this.passwordForm.reset();
          this.router.navigateByUrl('/login')
        }
      })
    }else {
      this.errorMessage = "Las contraseñas deben coincidir"
    }
  }
}
