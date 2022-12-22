import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMeetupsComponent } from './my-meetups.component';
import { MeetupCardComponent } from 'src/app/components/meetup-card/meetup-card.component';
import { MeetupCardModule } from 'src/app/components/meetup-card/meetup-card.module';
import { ButtonModule } from 'src/app/shared/UI/button/button.module';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PaginationModule } from 'src/app/shared/UI/pagination/pagination.module';

@NgModule({
    declarations: [MyMeetupsComponent],
    imports: [CommonModule, MeetupCardModule, ButtonModule, RouterModule, MatSlideToggleModule,PaginationModule],
    exports: [MyMeetupsComponent],
})
export class MyMeetupsModule {}
