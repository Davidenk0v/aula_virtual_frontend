import { Component } from '@angular/core';
import { User } from '../../interfaces/User';
import { Class } from '../../interfaces/Class';
import { FormsModule } from '@angular/forms';
import { CarouselComponentComponent } from '../../carousel-component/carousel-component.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CarouselComponentComponent],
  templateUrl: './user-profile.component.html',
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

  InProggressClasses: Class[] = [
    { className: 'clase 1', description: 'test 1' },
    { className: 'clase 2', description: 'test 1' },
    { className: 'clase 3', description: 'test 2' },
    { className: 'clase 4', description: 'test 1' },
    { className: 'clase 5', description: 'test 2' },
    { className: 'clase 6', description: 'test 1' },
    { className: 'clase 7', description: 'test 2' },
  ];

  SavedClasses: Class[] = [
    { className: 'clase 5', description: 'test 2' },
    { className: 'clase 6', description: 'test 1' },
    { className: 'clase 7', description: 'test 2' },
    { className: 'clase 8', description: 'test 1' },
    { className: 'clase 9', description: 'test 2' },
    { className: 'clase 10', description: 'test 2' },
  ];

  FinishedClasses: Class[] = [
    { className: 'clase 11', description: 'test 1' },
    { className: 'clase 12', description: 'test 1' },
    { className: 'clase 13', description: 'test 2' },
    { className: 'clase 14', description: 'test 1' },
    { className: 'clase 15', description: 'test 2' },
    { className: 'clase 16', description: 'test 1' },
    { className: 'clase 17', description: 'test 2' },
    { className: 'clase 18', description: 'test 1' },
  ];

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
