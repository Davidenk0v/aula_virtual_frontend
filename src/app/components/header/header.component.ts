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
  role?:string;

  constructor(
    private service: SearchService,
    private router: Router,
    private authService:AuthService,
    private jwtService:JwtService
  ) {}

  ngOnInit(): void {
    this.loggedIn();
    this.getName();
    this.getRole()
  }

  private loggedIn(){
    this.authService.loggedIn$.subscribe((loggedIn)=> {
      if(loggedIn){
        this.logged = true;
      }else if(sessionStorage.getItem("loggin") === "true"){
        this.logged = true;
      }else {
        this.logged = false;
      }
    })
  }

  private getName(){
    this.authService.name$.subscribe((nameFromToken)=> {
      if(nameFromToken){
        this.name = nameFromToken;
      }else{
        this.name = this.jwtService.getNameFromToken();
      }
    })
  }

  private getRole(){
    this.authService.role$.subscribe((roleFromToken)=> {
      if(roleFromToken.includes('teacher_class_room')) this.role = "teacher";
      if(roleFromToken.includes('student_class_room')) this.role = "student";
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
