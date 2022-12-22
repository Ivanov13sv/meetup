import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/shared/directiives/click-outside.directive';



@NgModule({
  declarations: [DropdownComponent, ClickOutsideDirective],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ], exports:[DropdownComponent]
})
export class DropdownModule { }
