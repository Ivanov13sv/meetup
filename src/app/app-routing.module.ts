import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupFormComponent } from './pages/meetup-form/meetup-form.component';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    { path: '',  component: AuthComponent },
    { path: 'meetups', component: AllMeetupsComponent, canActivate: [AuthGuard] },
    { path: 'my-meetups', component: MyMeetupsComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'my-meetups/meetup-form', component: MeetupFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
