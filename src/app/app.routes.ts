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
import { TeacherProfileComponent } from './users/teacher-profile/teacher-profile.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { VerifyDoneComponent } from './pages/verify-done/verify-done.component';
import { authGuard } from './guards/auth.guard';
import { studentGuard } from './guards/student.guard';
import { teacherGuard } from './guards/teacher.guard';
import { ZoomComponent } from './pages/zoom/zoom/zoom.component';

export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path:"login", component:LoginComponent, canActivate: [authGuard]},
    {path:"register", component:RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "course/:id", component: CourseComponent},
    {path: "create", component: CreateCourseComponent, canActivate: [teacherGuard]},
    {path: "edit/:idCourse", component: EditCourseComponent, canActivate: [teacherGuard]},
    {path:"search", component:SearchComponent},
    {path:"all-courses", component:AllCoursesComponent},
    {path:"student-profile",component:UserProfileComponent, canActivate: [studentGuard]},
    {path:"teacher-profile",component:TeacherProfileComponent, canActivate: [teacherGuard]},
    {path:"verify/:email",component:VerifyComponent},
    {path:"forgot-password", component:ForgotPasswordComponent},
    {path:"new-password/:id", component:NewPasswordComponent},
    {path:"verify-done/:email", component:VerifyDoneComponent}
];
