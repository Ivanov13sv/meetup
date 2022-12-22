import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { INewUser, UsersService } from 'src/app/services/users.service';
import { INotification } from 'src/app/shared/models/notification.interface';
import { EmailValidator } from 'src/app/shared/validators/email.validator';

@Component({
    selector: 'app-add-user-form',
    templateUrl: './add-user-form.component.html',
    styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private emailValidator: EmailValidator,
        private notificationService: NotificationService
    ) {}
    addForm = new FormGroup({
        email: new FormControl<string>(
            '',
            [Validators.required, Validators.email],
            [this.emailValidator.emailValidator()]
        ),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
        fio: new FormControl<string>('', [Validators.required]),
    });

    get email() {
        return this.addForm.controls.email;
    }
    get password() {
        return this.addForm.controls.password;
    }
    get fio() {
        return this.addForm.controls.fio;
    }

    get isEmailExists() {
        return this.addForm.get('email')?.errors?.['emailExist'];
    }

    get incorrectEmail() {
        return this.addForm.get('email')?.errors?.['email'];
    }

    onSubmitHandler() {
        if (this.addForm.valid) {
            const newUser = {
                email: this.email.value,
                fio: this.fio.value,
                password: this.password.value,
            };
            this.userService
                .createNewUser(newUser as INewUser)
                .subscribe(() => {
                    this.userService.getUsers().subscribe(res => {
                        this.modalService.close();
                        this.notificationService.handle(
                            'Пользователь успешно создан',
                            INotification.succes
                        );
                        this.userService.users = res;
                    });
                });
            return;
        }
        this.addForm.controls['email'].markAsTouched();
        this.addForm.controls['password'].markAsTouched();
        this.addForm.controls['fio'].markAsTouched();
        console.log(this.addForm.get('email')?.errors?.['email']);
        // if (this.addForm.hasError.name) {
        //     this.addForm.controls.email.markAsDirty;
        // }
        // if (this.addForm.valid) {
        // const newUser = {
        //     email: this.email.value,
        //     fio: this.fio.value,
        //     password: this.password.value,
        // };

        // this.userService
        //     .createNewUser(newUser as INewUser)
        //     .subscribe(() => {
        //         this.userService.getUsers().subscribe(res => {
        //             this.modalService.close();
        //             this.notificationService.handle(
        //                 'Пользователь успешно создан',
        //                 INotification.succes
        //             );
        //             this.userService.users = res;
        //         });
        //     });
        // }

        // this.addForm.setErrors({ 'empty-fileds': true });
    }

    ngOnInit(): void {}
}
