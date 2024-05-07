import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserEdit } from '../../interfaces/User';
import { UserProfile } from '../../interfaces/Profile';

@Component({
  selector: 'app-upload-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-profile.component.html',
  styleUrl: './upload-profile.component.css'
})
export class UploadProfileComponent implements OnInit{

  constructor(private userService:ProfileService,private formBuid:FormBuilder){}

  @Output() profileEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  profile = this.formBuid.group({
    lastname: [""],
    firstname: [""],
    urlImg: [""]
  });

  ngOnInit(): void {
    
  }

  update(){
    console.info(this.profile)
    this.userService.updateProfile(2,this.profile.value as UserEdit).subscribe({
      next: (data) => {
        console.info(this.profile.value as User)
        console.info(data);
      },error:(data) => {
        console.info(data, "Error")
      },
      complete:()=> {
        console.info("Completo")  
        alert("Actualizado")      
        this.cancelar();
      }
    });
  }

  cancelar():void{
    this.profileEdited.emit(false)
  }

}
