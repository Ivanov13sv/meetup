import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupService } from 'src/app/services/meetup.service';
import { ModalService } from 'src/app/services/modal.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { IMeetup } from 'src/app/shared/models/meetup.interface';
@Component({
    selector: 'app-my-meetups',
    templateUrl: './my-meetups.component.html',
    styleUrls: ['./my-meetups.component.scss'],
    providers:[PaginationService]

})
export class MyMeetupsComponent implements OnInit {
    constructor(
        // public meetupService: MeetupService,
        public modalService: ModalService,
        public meetupsService: MeetupService,
        public paginationService: PaginationService
    ) {}

    limit: number = 5;
    currentPage: number = 1;
    changePage(page: number): void {
        this.currentPage = page;
        console.log(page);
    }

    get slicedMeetups() {
        const firstPageIndex = (this.currentPage - 1) * this.limit;
        const lastPageIndex = firstPageIndex + this.limit;
        return this.meetupsService.myMeetups.slice(
            firstPageIndex,
            lastPageIndex
        );
    }

    ngOnInit() {
        this.meetupsService.getMyMeetups().subscribe(result => {
            this.paginationService.total = result.length;
        });

    }
}
