import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/UI/spinner/spinner.component';
import { SpinnerModule } from 'src/app/shared/UI/spinner/spinner.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, SpinnerModule],
    exports: [AuthComponent],
})
export class AuthModule {}
