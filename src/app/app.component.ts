import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule, 
    RouterOutlet, 
    LoginComponent, 
    RegisterComponent, 
    HeaderComponent, 
    FooterComponent, 
    HttpClientModule,
    KeycloakAngularModule, 
    RouterModule,
    UserProfileComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'aula-virtual-frontend';
  
  
}
