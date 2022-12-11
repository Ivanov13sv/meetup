import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    exports: [AuthComponent],
})
export class AuthModule {}
