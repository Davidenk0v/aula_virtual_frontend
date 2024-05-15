import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent, 
    FooterComponent, 
    HttpClientModule,
    // El que me daba fallo es esta linea:
    ForgotPasswordComponent, 
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'aula-virtual-frontend';
  
}
