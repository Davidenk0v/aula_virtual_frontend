import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

export const routes: Routes = [
    { path: "userProfile", component: UserProfileComponent},
    { path: "homeScreen", component: HomeComponent},
    { path: "create", component: CreateCourseComponent},
    { path: "edit", component: EditCourseComponent},

];
