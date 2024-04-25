import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, HeaderComponent, UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aula-virtual-frontend';
}
