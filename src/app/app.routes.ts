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
import { CreateLessonComponent } from './pages/create-lesson/create-lesson.component';
import { EditLessonComponent } from './pages/edit-lesson/edit-lesson.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { VerifyDoneComponent } from './pages/verify-done/verify-done.component';
import { authGuard } from './guards/auth.guard';
import { studentGuard } from './guards/student.guard';
import { teacherGuard } from './guards/teacher.guard';
import { ZoomComponent } from './pages/zoom/zoom/zoom.component';
import { LessonComponent } from './pages/lesson/lesson.component';

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
    {path:"student-profile",component:UserProfileComponent},
    {path:"teacher-profile",component:TeacherProfileComponent},
    {path:"verify/:email",component:VerifyComponent},
    {path: "create-lessons/:courseId/:idSubject", component: CreateLessonComponent },
    {path: "edit-lessons/:idLesson", component: EditLessonComponent },
    {path: "lesson/:idCourse/:idLesson", component: LessonComponent},

];
