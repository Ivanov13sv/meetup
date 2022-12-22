import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TestService } from 'src/app/services/test.service';
import { UsersService } from 'src/app/services/users.service';
import { INotification } from 'src/app/shared/models/notification.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { EmailValidator } from '../../shared/validators/email.validator';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
    providers: [ConfirmService],
})
export class UserItemComponent implements OnInit {
    constructor(
        public userService: UsersService,
        private fb: FormBuilder,
        public dropdownService: DropdownService,
        public emailValidator: EmailValidator,
        private notificationService: NotificationService,
        private authService: AuthService,
        public confirmService: ConfirmService
    ) {}
    @Input() user!: IUser;

    editMode$ = new BehaviorSubject<boolean>(false);

    testOff() {
        this.confirmService.closeConfirm();
    }

    roles: any[] = [];
    form!: FormGroup;
    activeRole$ = new BehaviorSubject<string>('');

    get activeRole() {
        return this.activeRole$.getValue();
    }

    closeConfirm() {
        this.confirmService.closeConfirm();
        this.editMode$.next(false);
        this.form
            .get('email')
            ?.[this.editMode$.getValue() ? 'enable' : 'disable']();
        this.form
            .get('password')
            ?.[this.editMode$.getValue() ? 'enable' : 'disable']();
    }

    get editMode() {
        return this.editMode$.getValue();
    }
    toggleEditMode() {
        this.editMode$.next(true);
        this.confirmService.openConfirm();
        this.form
            .get('email')
            ?.[this.editMode$.getValue() ? 'enable' : 'disable']();
        this.form
            .get('password')
            ?.[this.editMode$.getValue() ? 'enable' : 'disable']();
    }

    get email() {
        return this.form.controls['email'];
    }
    get password() {
        return this.form.controls['password'];
    }

    onUpdateUserHandler() {
        const updatedUser = {
            email: this.email.value,
            password: this.user.password,
        };
        this.userService
            .updateUser(this.user.id, updatedUser, this.activeRole)
            .subscribe(res => {
                this.editMode$.next(false);
                this.closeConfirm();
                this.notificationService.handle(
                    'Пользователь успешно изменен',
                    INotification.succes
                );
            });
    }

    onRemoveUserHandler(id: number) {
        if (this.authService.user.id === id) {
            this.notificationService.handle(
                'Вы не можете удалить сам себя',
                INotification.error
            );
            return;
        }
        this.userService.removeUser(id).subscribe(() => {
            this.closeConfirm();
            this.notificationService.handle(
                'Пользователь удален',
                INotification.warning
            );
        });
    }

    chooseRole(value: any) {
        this.activeRole$.next(value);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl<string>(
                { value: this.user.email, disabled: true },
                [Validators.required, Validators.email],
                [this.emailValidator.emailValidator()]
            ),
            password: new FormControl<string>(
                { value: this.user.password, disabled: true },
                [(Validators.required, Validators.minLength(6))]
            ),
        });

        this.activeRole$.next(this.user.roles[0].name);
    }
}
