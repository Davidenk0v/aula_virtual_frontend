import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path:"register", component:RegisterComponent}
];
