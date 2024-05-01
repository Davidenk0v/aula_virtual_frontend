import { Component } from '@angular/core';
import { User } from '../../interfaces/User';
import { Course } from '../../interfaces/Course';
import { FormsModule } from '@angular/forms';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CarouselComponentComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  ngOnInit(): void {
    this.user;
  }

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    emailVerified: false,
  };

  userTemplate: User = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    emailVerified: false,
  };

  popupShown = false;


  showPopup(): boolean {
    return (this.popupShown = true);
  }

  closePopup(): boolean {
    return (this.popupShown = false);
  }

  updateUser(updatedUser: User) {
    (this.user.firstName = updatedUser.firstName),
      (this.user.lastName = updatedUser.lastName),
      (this.user.email = updatedUser.email),
      (this.user.userName = updatedUser.userName);

    return (this.popupShown = false);
  }
}
