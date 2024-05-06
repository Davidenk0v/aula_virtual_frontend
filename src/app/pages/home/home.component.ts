import { Component } from '@angular/core';
import { CarouselComponentComponent } from '../../components/carousel-component/carousel-component.component';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponentComponent, AsyncPipe, ErrorMessageComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {




}
