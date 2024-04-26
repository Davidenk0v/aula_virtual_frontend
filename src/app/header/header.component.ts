import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router,
  ) {}

  goToProfile() {
    this.router.navigate(['/userProfile']);
  }

  goToHome() {
    this.router.navigate(['/homeScreen']);
  }

  // 
  // @Input() username?: string 
}
