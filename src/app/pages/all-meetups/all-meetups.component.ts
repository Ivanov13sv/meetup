import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
    selector: 'app-all-meetups',
    templateUrl: './all-meetups.component.html',
    styleUrls: ['./all-meetups.component.scss'],
})
export class AllMeetupsComponent implements OnInit {
    constructor(private meetupsService: MeetupService, private authService: AuthService) {}



    ngOnInit(): void {
        this.meetupsService.getAllMeetups();
    }
}
