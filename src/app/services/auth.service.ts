import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
    catchError,
    delay,
    Observable,
    retry,
    tap,
    throwError,
    debounceTime,
    debounce,
} from 'rxjs';
import { environment } from '../environments/environment';
import { NotificationService } from './notification.service';
import { INotification } from '../shared/models/notification.interface';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authUrl: string = `${environment.apiUrl}/auth`;

    public get token(): string | null {
        return localStorage.getItem('del_meetups_auth_token');
    }

    constructor(
        public http: HttpClient,
        private router: Router,
        private notificationService: NotificationService,
        private spinnerService: SpinnerService
    ) {}

    parseJwt(token: string) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    public get user(): any | null {
        const token = localStorage.getItem('del_meetups_auth_token');
        if (token) {
            const user: any = this.parseJwt(token);
            return user;
        } else return null;
    }

    private errorHandler() {
        this.notificationService.handle(
            'Неверный логин или пароль',
            INotification.error
        );
        this.spinnerService.loading = false;
        return throwError(() => 'incorrect email or password');
    }

    login(email: string, password: string): Observable<{ token: string }> {
        this.spinnerService.loading = true;
        return this.http
            .post<{ token: string }>(`${this.authUrl}/login`, {
                email,
                password,
            })
            .pipe(
                delay(1100),
                tap(res => {
                    if (res.token) {
                        localStorage.setItem(
                            'del_meetups_auth_token',
                            res.token
                        );
                        this.router.navigate(['meetups']);
                        console.log('hello');
                    }
                }),
                catchError(this.errorHandler.bind(this)),
                tap(() =>
                    this.notificationService.handle(
                        `Добро пожаловать!`,
                        INotification.succes
                    )
                )
            );
    }

    logout() {
        localStorage.removeItem('del_meetups_auth_token');
        this.router.navigate(['']);
    }

    getRole() {
        return this.user.roles.some((item: any) => item.name === 'ADMIN')
            ? 'ADMIN'
            : 'USER';
    }

    // createNewUser(value: any){
    //     console.log(value)
    // }
}
