import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupCardComponent } from './meetup-card.component';
import { ButtonModule } from '../../shared/UI/button/button.module';
import { SpinnerModule } from '../../shared/UI/spinner/spinner.module';
import { ClickOutsideDirective } from 'src/app/shared/directiives/click-outside.directive';

@NgModule({
    declarations: [MeetupCardComponent],
    imports: [CommonModule, ButtonModule, SpinnerModule],
    exports: [MeetupCardComponent],
})
export class MeetupCardModule {}
