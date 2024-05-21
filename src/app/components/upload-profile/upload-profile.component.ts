import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { User, UserEdit } from '../../interfaces/User';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
  selector: 'app-upload-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-profile.component.html',
  styleUrl: './upload-profile.component.css'
})
export class UploadProfileComponent implements OnInit{

  constructor(private userService:ProfileService,private formBuid:FormBuilder, private jwtService:JwtService){}

  @Output() profileEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  profile = this.formBuid.group({
    username: [""],
    lastname: [""],
    firstname: [""],
    urlImg: [""]
  });

  email:string = '';

  ngOnInit(): void {
    this.email = this.jwtService.getEmailFromToken();
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
        this.cancelar();
      }
    });
  }

  cancelar():void{
    this.profileEdited.emit(false)
  }

}
