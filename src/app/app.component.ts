import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LessonsComponent } from "./pages/lessons/lessons.component";
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent, LessonsComponent,ReactiveFormsModule,FormsModule]
})
export class AppComponent {
  title = 'aula-virtual-frontend';
}
