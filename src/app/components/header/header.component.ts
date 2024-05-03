import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

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
    private authService:AuthService
  ) {}

  mensaje : string = "";
  profile: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showData();
    console.log(this.profile);
  }


  showData() {
    this.profile = this.authService.getProfile();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
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
