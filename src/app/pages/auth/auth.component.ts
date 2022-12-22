import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { INotification } from 'src/app/shared/models/notification.interface';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    constructor(
        private authService: AuthService,
        public spinnerService: SpinnerService,
        private notificationService: NotificationService,
        private fb: FormBuilder
    ) {}

    form!: FormGroup;

    get login() {
        return this.form.controls['login'];
    }

    get password() {
        return this.form.controls['password'];
    }

    onSubmitHandler() {
        if (this.form.valid) {
            this.authService
                .login(this.login.value, this.password.value)
                .subscribe(() => {
                    this.spinnerService.loading = false;
                });
        } else {
            this.notificationService.handle(
                'Логин и пароль должны быть заполнены',
                INotification.error
            );
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            login: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', [Validators.required]),
        });
    }
}
