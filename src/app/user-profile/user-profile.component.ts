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


  currentSlide = 0
  classesChantity = 3
  totalClasses = this.classes.length
  

  changeSlideRight(){
    if (this.currentSlide < this.totalClasses - this.classesChantity && this.currentSlide > -1) {
      this.currentSlide = this.currentSlide + this.classesChantity;      
    } else {
      this.currentSlide = this.currentSlide = 0
    }    
  }

  changeSlideLeft(){
    if (this.currentSlide <= this.totalClasses - this.classesChantity && this.currentSlide > 0) {
      this.currentSlide = this.currentSlide - this.classesChantity;      
    } else {
      this.currentSlide = this.currentSlide = 0
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
