import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { DropdownModule } from 'src/app/shared/UI/dropdown/dropdown.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserItemComponent } from 'src/app/components/user-item/user-item.component';
import { ButtonModule } from 'src/app/shared/UI/button/button.module';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AddUserFormComponent } from 'src/app/components/add-user-form/add-user-form.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@NgModule({
    declarations: [UsersComponent, UserItemComponent, ModalComponent, AddUserFormComponent,  ConfirmComponent],
    imports: [CommonModule, DropdownModule, ButtonModule, FormsModule, ReactiveFormsModule],
    exports: [UsersComponent],
})
export class UsersModule {}
