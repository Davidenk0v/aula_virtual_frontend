import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private service: SearchService,
    private router: Router,
  ) {}

  permiso : boolean = false

  mensaje : string = "";
  goToProfile() {
    this.router.navigate(['/userProfile']);
  }

  goToHome() {
    this.router.navigate(['/homeScreen']);
  }

  onEnter(event: KeyboardEvent) {
    // Verifica si la tecla presionada es "Enter" (código 13)
    if (event.key === "Enter") {
      // Ejecuta la lógica que deseas cuando se presiona "Enter"
      this.service.setString(this.mensaje);
      this.router.navigateByUrl('/search');
    
    }
  }
  // 
  // @Input() username?: string 
}
