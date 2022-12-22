import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupFormComponent } from './meetup-form.component';
import { ButtonComponent } from '../../shared/UI/button/button.component';
import { ButtonModule } from '../../shared/UI/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../../shared/UI/dropdown/dropdown.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [MeetupFormComponent],
    imports: [CommonModule, ButtonModule, ReactiveFormsModule,FormsModule, DropdownModule, MatSelectModule],
    exports: [MeetupFormComponent],
})
export class MeetupFormModule {}
