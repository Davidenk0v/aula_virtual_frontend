import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
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
