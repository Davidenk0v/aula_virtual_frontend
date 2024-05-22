import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserEdit } from '../../../interfaces/User';
import { ProfileService } from '../../../services/profile.service';
import { JwtService } from '../../../services/jwt/jwt.service';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {

  constructor(private formBuilder:FormBuilder, private userService:ProfileService, private jwtService:JwtService){}

  @Input() teacher?:User
  email!:string;


  profile = this.formBuilder.group({
    username: [this.teacher?.username, [Validators.required]],
    lastname: [this.teacher?.lastName,[Validators.required]],
    firstname: [this.teacher?.firstName, [Validators.required]],
    urlImg: ['']
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.email = this.jwtService.getEmailFromToken()
  }

  update(){
    console.info(this.profile)
    this.userService.updateProfile(this.email,this.profile.value as UserEdit).subscribe({
      next: (data) => {
        console.info(this.profile.value as User)
        console.info(data);
      },error:(data) => {
        console.info(data, "Error")
      },
      complete:()=> {
        console.info("Completo")  
        sessionStorage.setItem('edit', 'Se ha editado el perfil correctamente')
      }
    });
  }

}
