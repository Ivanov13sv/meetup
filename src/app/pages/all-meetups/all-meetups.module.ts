import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMeetupsComponent } from './all-meetups.component';
import { PaginationModule } from 'src/app/shared/UI/pagination/pagination.module';
import { MeetupCardModule } from 'src/app/components/meetup-card/meetup-card.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AllMeetupsComponent],
    exports: [AllMeetupsComponent],
    imports: [CommonModule,  PaginationModule, MeetupCardModule, FormsModule],
})
export class AllMeetupsModule {}
