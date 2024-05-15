import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmailService } from '../../services/emails/email.service';

@Component({
  selector: 'app-verify-done',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './verify-done.component.html',
  styleUrl: './verify-done.component.css'
})
export class VerifyDoneComponent {

  constructor(private activateRoute:ActivatedRoute, private emailService:EmailService){}

  email:string = this.activateRoute.snapshot.params['email'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.verifyEmail()
  }

  verifyEmail(){
    this.emailService.verifyEmail(this.email).subscribe({
      next: (response) => {
        console.info(response)
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        console.log("Done")
      }
    })
  }

}
