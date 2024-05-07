import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { SearchComponent } from './pages/search/search.component';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { CourseComponent } from './course/course.component';
import { UserComponent } from './users/user/user.component';

export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "course/:id", component: CourseComponent},
    {path: "create", component: CreateCourseComponent},
    {path: "edit/:idCourse", component: EditCourseComponent},
    {path:"search", component:SearchComponent},
    {path:"all-courses", component:AllCoursesComponent},
    {path:"profile",component:UserComponent}
];
