import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../../services/jwt/jwt.service';


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
  
  logged:boolean = false

  mensaje:string = "";
  name:string = "";

  constructor(
    private service: SearchService,
    private router: Router,
    private authService:AuthService,
    private jwtService:JwtService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn)=> {
      if(loggedIn){
        this.logged = true;
      }else if(sessionStorage.getItem("loggin") === "true"){
        this.logged = true;
      }else {
        this.logged = false;
      }
      this.name = this.jwtService.getNameFromToken();
    })
    
  }

  logout(){
    this.authService.logout();
    this.name = ''
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
