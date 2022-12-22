import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupService } from 'src/app/services/meetup.service';
import { IMeetup } from 'src/app/shared/models/meetup.interface';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-meetup-card',
    templateUrl: './meetup-card.component.html',
    styleUrls: ['./meetup-card.component.scss'],
})
export class MeetupCardComponent implements OnInit {
    constructor(
        private authService: AuthService,
        public router: Router,
        public meetupsService: MeetupService,
        public spinnerService: SpinnerService
    ) {}
    @Input() meetup!: IMeetup;
    // isSubscriber$ = new BehaviorSubject<boolean>(
    //     this.meetup?.users.some(item => item.id === this.authService.user.id)
    // );
    // isSubcriber = this.meetup?.users.some(item => item.id === this.authService.user.id);

    public get isMeetupPassed(): Boolean {
        return new Date(this.meetup.time).getTime() < Date.now();
    }

    isOpenInfo: boolean = false;

    toggleInfo() {
        this.isOpenInfo = !this.isOpenInfo;
    }

    get isOwner() {
        return this.meetup.owner.id === this.authService.user.id;
    }

    get isSubsriber() {
        return this.meetup.users.some(
            item => item.id === this.authService.user.id
        );
    }

    get followers() {
        if (!this.meetup.users.length) {
            return 'Нет подписчиков';
        }
        if (this.meetup.users.length === 1) {
            return '1 подписчик';
        }
        if (this.meetup.users.length > 1 && this.meetup.users.length < 5) {
            return `${this.meetup.users.length} подписчика`;
        }
        return `${this.meetup.users.length} подписчиков`;
    }
    ngOnInit() {
    }

    onSubscribeHandler() {
        if (this.isSubsriber) {
            this.meetupsService
                .unsubscribeFromMeetup(this.meetup.id, this.authService.user.id)
                .subscribe(() =>
                    this.meetupsService
                        .getAllMeetups()
                        .subscribe(
                            res => (this.meetupsService.allMeetups = res)
                        )
                );
        } else {
            this.meetupsService
                .subscribeToMeetup(this.meetup.id, this.authService.user.id)
                .subscribe(() => {
                    this.meetupsService
                        .getAllMeetups()
                        .subscribe(
                            res => (this.meetupsService.allMeetups = res)
                        );
                });
        }
    }
}
