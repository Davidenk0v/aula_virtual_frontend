import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponentComponent } from './carousel-component/carousel-component.component';
import { CreateCourseComponent } from './create-course/create-course.component';

export const routes: Routes = [
    { path: "userProfile", component: UserProfileComponent},
    { path: "homeScreen", component: HomeComponent},
    { path: "createCourse", component: CreateCourseComponent},
];
