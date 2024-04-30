import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from "./pages/search/search.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent
    ]
})
export class AppComponent {
  title = 'aula-virtual-frontend';
}
