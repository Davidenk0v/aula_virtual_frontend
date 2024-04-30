import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

export const routes: Routes = [
    {path:"", redirectTo:"/login", pathMatch:"full"},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"profile", component:UserProfileComponent},
    { path: "homeScreen", component: HomeComponent},
    { path: "create", component: CreateCourseComponent},
    { path: "edit", component: EditCourseComponent},

];
