import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from "./pages/search/search.component";
import { SearchService } from './service/search.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
    selector: 'app-root',
    providers: [SearchService,HttpClient],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      SearchComponent,
      HttpClientModule]
})
export class AppComponent {
  title = 'aula-virtual-frontend';
}
