import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './pages/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AllMeetupsModule } from './pages/all-meetups/all-meetups.module';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { UsersModule } from './pages/users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyMeetupsModule } from './pages/my-meetups/my-meetups.module';
import { MeetupFormComponent } from './pages/meetup-form/meetup-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MeetupFormModule } from './pages/meetup-form/meetup-form.module';
import { EmailValidator } from './shared/validators/email.validator';
import { NotificationComponent } from './shared/UI/notification/notification.component';
import { SpinnerComponent } from './shared/UI/spinner/spinner.component';
import { ClickOutsideDirective } from './shared/directiives/click-outside.directive';
import { MeetupCardModule } from './components/meetup-card/meetup-card.module';
import { DropdownModule } from './shared/UI/dropdown/dropdown.module';

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NotificationComponent
   
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        AllMeetupsModule,
        FormsModule,
        ReactiveFormsModule,
        MyMeetupsModule,
        UsersModule,
        BrowserAnimationsModule,
        MeetupFormModule,
        MeetupCardModule,
        DropdownModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'ru' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
