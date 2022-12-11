import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    constructor(private authService: AuthService) {}

    form = new FormGroup({
        login: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
    });

    get login() {
        return this.form.controls.login.value;
    }

    get password() {
        return this.form.controls.password.value;
    }


    onSubmitHandler() {
        if (this.login && this.password) {
            this.authService.login(this.login, this.password).subscribe(() => {
                // const user = this.authService.user
                // console.log(user.roles)
                console.log('questions')
            });
        }
    }
}
