import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  constructor(private authService:AuthService, private router:Router) { }
  profile:any;

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.profile = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }
}
