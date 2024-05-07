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
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    emailVerified: false,
  };

  userTemplate: User = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
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
    (this.user.firstname = updatedUser.firstname),
      (this.user.lastname = updatedUser.lastname),
      (this.user.email = updatedUser.email),
      (this.user.username = updatedUser.username);

    return (this.popupShown = false);
  }
}
