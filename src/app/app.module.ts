import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { AuthModule } from './pages/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UsersComponent } from './pages/users/users.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContainerComponent,
        AllMeetupsComponent,
        UsersComponent,
        MyMeetupsComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, AuthModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
