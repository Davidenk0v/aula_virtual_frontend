import { Component } from '@angular/core';
import { userI } from '../modelos/user.interface';
import { classI } from '../modelos/class.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {


  ngOnInit(): void {
    this.user
  }

  user: userI = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    username: ""
  }

  userTemplate: userI = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    username: ""
  }


  popupShown = false;

  classes: classI[] = [{className: "clase 1", description: "test 1"}, {className: "clase 2", description: "test 2"}]

  showPopup(): boolean {
    return this.popupShown = true;
  }

  closePopup(): boolean {
    return this.popupShown = false;
  }

  updateUser(updatedUser: userI) {
    this.user.firstName= updatedUser.firstName,
    this.user.lastName= updatedUser.lastName,
    this.user.email= updatedUser.email,
    this.user.address= updatedUser.address,
    this.user.username= updatedUser.username

    return this.popupShown = false;
  }

}
