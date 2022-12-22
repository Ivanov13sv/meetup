import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { MeetupService } from 'src/app/services/meetup.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
    selector: 'app-all-meetups',
    templateUrl: './all-meetups.component.html',
    styleUrls: ['./all-meetups.component.scss'],
    providers: [PaginationService],
})
export class AllMeetupsComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
    });
    constructor(
        public meetupsService: MeetupService,
        public paginationService: PaginationService
    ) {}

    ngOnInit(): void {
        this.meetupsService.getAllMeetups().subscribe(result => {
            console.log(result.length);
            // this.paginationService.total1 = result.length;
            // this.paginationService.total$.next(result.length)
        });
        
    }

    limit: number = 4;
    currentPage: number = 1;
    changePage(page: number): void {
        this.currentPage = page;
    }

    get slicedMeetups() {
        const firstPageIndex = (this.currentPage - 1) * this.limit;
        const lastPageIndex = firstPageIndex + this.limit;
        return this.meetupsService.allMeetups.slice(
            firstPageIndex,
            lastPageIndex
        );
    }
}
