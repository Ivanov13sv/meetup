import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class EmailValidator {
    constructor(private userService: UsersService) {}
    private emailExist(email: string): Observable<boolean> {
        return this.userService.getUsers().pipe(
            delay(500),
            tap(console.log),
            map((response: any[]) => {
                const isExist = response.some(
                    item =>
                        item.email.toLowerCase() === email.toLocaleLowerCase()
                );
                return isExist;
            })
        );
    }

    public emailValidator(): AsyncValidatorFn {
        return (
            control: AbstractControl
        ): Observable<ValidationErrors | null> =>
            this.emailExist(control.value).pipe(
                map(response => {
                    console.log(response);
                    return response ? { emailExist: true } : null;
                })
            );
    }
}
