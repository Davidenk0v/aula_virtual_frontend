import { Component } from '@angular/core';
import { userI } from '../modelos/user.interface';
import { classI } from '../modelos/class.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  ngOnInit(): void {
    this.user;
  }

  user: userI = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    username: '',
  };

  userTemplate: userI = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    username: '',
  };

  popupShown = false;

  classes: classI[] = [
    { className: 'clase 1', description: 'test 1' },
    { className: 'clase 2', description: 'test 1' },
    { className: 'clase 3', description: 'test 2' },
    { className: 'clase 4', description: 'test 1' },
    { className: 'clase 5', description: 'test 2' },
    { className: 'clase 6', description: 'test 1' },
    { className: 'clase 7', description: 'test 2' },
    { className: 'clase 8', description: 'test 1' },
    { className: 'clase 9', description: 'test 2' },
    { className: 'clase 10', description: 'test 2' },
  ];

  classesChantity = 3;
  currentSlideProgress = 0;
  totalClassesProgress = this.classes.length;

  changeSlideRightProgress() {
    if (
      this.currentSlideProgress <
        this.totalClassesProgress - this.classesChantity &&
      this.currentSlideProgress > -1
    ) {
      this.currentSlideProgress =
        this.currentSlideProgress + this.classesChantity;
    } else {
      this.currentSlideProgress = this.currentSlideProgress = 0;
    }
  }

  changeSlideLeftProgress() {
    if (
      this.currentSlideProgress <=
        this.totalClassesProgress - this.classesChantity &&
      this.currentSlideProgress > 0
    ) {
      this.currentSlideProgress =
        this.currentSlideProgress - this.classesChantity;
    } else {
      this.currentSlideProgress = this.currentSlideProgress = 0;
    }
  }

  currentSlideSaved = 0;
  totalClassesSaved = this.classes.length;

  changeSlideRightSaved() {
    if (
      this.currentSlideSaved <
        this.totalClassesSaved - this.classesChantity &&
      this.currentSlideSaved > -1
    ) {
      this.currentSlideSaved =
        this.currentSlideSaved + this.classesChantity;
    } else {
      this.currentSlideSaved = this.currentSlideSaved = 0;
    }
  }

  changeSlideLeftSaved() {
    if (
      this.currentSlideSaved <=
        this.totalClassesSaved - this.classesChantity &&
      this.currentSlideSaved > 0
    ) {
      this.currentSlideSaved =
        this.currentSlideSaved - this.classesChantity;
    } else {
      this.currentSlideSaved = this.currentSlideSaved = 0;
    }
  }

  currentSlideComplete = 0;
  totalClassesComplete = this.classes.length;

  changeSlideRightComplete() {
    if (
      this.currentSlideComplete <
        this.totalClassesComplete - this.classesChantity &&
      this.currentSlideComplete > -1
    ) {
      this.currentSlideComplete =
        this.currentSlideComplete + this.classesChantity;
    } else {
      this.currentSlideComplete = this.currentSlideComplete = 0;
    }
  }

  changeSlideLeftComplete() {
    if (
      this.currentSlideComplete <=
        this.totalClassesComplete - this.classesChantity &&
      this.currentSlideComplete > 0
    ) {
      this.currentSlideComplete =
        this.currentSlideComplete - this.classesChantity;
    } else {
      this.currentSlideComplete = this.currentSlideComplete = 0;
    }
  }

  showPopup(): boolean {
    return (this.popupShown = true);
  }

  closePopup(): boolean {
    return (this.popupShown = false);
  }

  updateUser(updatedUser: userI) {
    (this.user.firstName = updatedUser.firstName),
      (this.user.lastName = updatedUser.lastName),
      (this.user.email = updatedUser.email),
      (this.user.address = updatedUser.address),
      (this.user.username = updatedUser.username);

    return (this.popupShown = false);
  }
}
