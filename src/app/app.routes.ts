import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CourseComponent } from './course/course.component';
import { InfoCourseComponent } from './course/info-course/info-course.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent}
=========
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

export const routes: Routes = [
    { path: "userProfile", component: UserProfileComponent},
    { path: "homeScreen", component: HomeComponent},
    { path: "create", component: CreateCourseComponent},
    { path: "edit", component: EditCourseComponent},
    {path:"search", component:SearchComponent}
>>>>>>>>> Temporary merge branch 2

];
