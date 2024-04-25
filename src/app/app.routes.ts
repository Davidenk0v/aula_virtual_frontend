import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"profile", component:UserProfileComponent},
];
