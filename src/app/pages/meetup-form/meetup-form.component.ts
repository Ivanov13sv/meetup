import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { MeetupService } from 'src/app/services/meetup.service';
import { IMeetup } from 'src/app/shared/models/meetup.interface';
import { INotification } from 'src/app/shared/models/notification.interface';

export interface INewMeetup {
    name: string;
    description: string;
    time: string;
    duration: number;
    location: string;
    target_audience: string;
    need_to_know: string;
    will_happen: string;
    reason_to_come: string;
}

@Component({
    selector: 'app-eetup-form',
    templateUrl: './meetup-form.component.html',
    styleUrls: ['./meetup-form.component.scss'],
})
export class MeetupFormComponent implements OnInit {
    constructor(
        private meetupsService: MeetupService,
        private fb: FormBuilder,
        public router: Router,
        public locationService: Location,
        private notificationService: NotificationService
    ) {
        if (this.router.getCurrentNavigation()?.extras?.state) {
            console.log('edit');
            const navigation = this.router.getCurrentNavigation();
            const state = navigation?.extras.state as { meetup: IMeetup };
            this.editMeetup = state.meetup;
            this.chosenDuration = this.editMeetup.duration as number;
        } else {
            console.log('create');
        }
    }
    form!: FormGroup;
    editMeetup?: IMeetup;
    chosenDuration: number = 10;
    meetupDuration = [
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '60',
        '65',
        '70',
        '75',
        '80',
        '85',
        '90',
    ];

    get name() {
        return this.form.controls['name'];
    }
    get date() {
        return this.form.controls['date'];
    }
    get location() {
        return this.form.controls['location'];
    }

    onSubmitHandler() {
        if (this.form.valid) {
            const newMeetup: INewMeetup = {
                name: this.form.controls['name'].value,
                description: this.form.controls['description'].value,
                duration: +this.chosenDuration,
                location: this.form.controls['location'].value,
                need_to_know: this.form.controls['need_to_know'].value,
                reason_to_come: this.form.controls['reason_to_come'].value,
                target_audience: this.form.controls['target_audience'].value,
                time: this.form.controls['date'].value,
                will_happen: this.form.controls['will_happen'].value,
            };

            if (this.editMeetup) {
                this.meetupsService
                    .updateMeetup(this.editMeetup.id, newMeetup)
                    .subscribe(() => {
                        this.router.navigate(['meetups']);
                        this.notificationService.handle('Митап изменен', INotification.succes);
                    });
            } else {
                this.meetupsService.createMeetup(newMeetup).subscribe(() =>{
                    this.router.navigate(['meetups']);
                        this.notificationService.handle('Митап создан', INotification.succes);
                });
            }
        } else {
            this.form.controls['name'].markAsTouched();
            this.form.controls['date'].markAsTouched();
            this.form.controls['location'].markAsTouched();
            this.notificationService.handle('Заполните обязательные поля', INotification.error);

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }

    onDeleteHandler() {
        if (this.editMeetup) {
            this.meetupsService
                .deleteMeetup(this.editMeetup.id)
                .subscribe(() => {
                    this.router.navigate(['meetups'])
                    this.notificationService.handle('Митап удален', INotification.warning);
                } );
        }
    }

    value: any = '2018-06-12T19:30';

    test(value: any) {
        this.chosenDuration = value;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: new FormControl<string>(
                this.editMeetup ? this.editMeetup.name : '',
                [Validators.required]
            ),
            date: new FormControl<string>(
                this.editMeetup
                    ? this.editMeetup?.time.toString().slice(0, 16)
                    : '',
                [Validators.required]
            ),
            duration: new FormControl<number>(
                this.editMeetup ? this.editMeetup.duration : 10
            ),
            location: new FormControl<string>(
                this.editMeetup ? this.editMeetup.location : '',
                [Validators.required]
            ),
            description: new FormControl<string>(
                this.editMeetup ? this.editMeetup.description : ''
            ),
            full_description: new FormControl<string>(
                this.editMeetup ? this.editMeetup.description : ''
            ),
            target_audience: new FormControl<string>(
                this.editMeetup ? this.editMeetup.target_audience : ''
            ),
            need_to_know: new FormControl<string>(
                this.editMeetup ? this.editMeetup.need_to_know : ''
            ),
            will_happen: new FormControl<string>(
                this.editMeetup ? this.editMeetup.will_happen : ''
            ),
            reason_to_come: new FormControl<string>(
                this.editMeetup ? this.editMeetup.reason_to_come : ''
            ),
        });

        // console.log(this.editMeetup?.time)

        // this.form.valueChanges.subscribe((res) => {
        //     console.log(res)
        //     console.log(this.form.controls['name'].invalid)
        //     console.log(this.form.controls['name'].dirty)
        // })
    }
}
