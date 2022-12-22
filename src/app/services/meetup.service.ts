import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { INewMeetup } from '../pages/meetup-form/meetup-form.component';
import { environment } from '../environments/environment';
import { IMeetup } from '../shared/models/meetup.interface';
import { AuthService } from './auth.service';
import { PaginationService } from './pagination.service';

@Injectable({
    providedIn: 'root',
})
export class MeetupService {
    constructor(private authService: AuthService, private http: HttpClient, private paginationService: PaginationService) {}

    meetupsURL: string = `${environment.apiUrl}/meetup`;

    searchField: string = '';

    private myMeetups$ = new BehaviorSubject<IMeetup[]>([]);

    testMyMeetups$ = new BehaviorSubject<IMeetup[]>([]);

    get myMeetups() {
        return this.myMeetups$.getValue();
    }

    set myMeetups(meetups: IMeetup[]) {
        this.myMeetups$.next(meetups);
    }

    private allMeetups$ = new BehaviorSubject<IMeetup[]>([]);

    set allMeetups(meetups: IMeetup[]) {
        this.allMeetups$.next(meetups);
    }

    get allMeetups() {
        const result = this.allMeetups$.getValue().filter(item => {

            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(this.searchField.toLocaleLowerCase()) ||
                item.owner.fio
                    .toLocaleLowerCase()
                    .includes(this.searchField.toLocaleLowerCase())
            );
        });
        this.paginationService.total$.next(result.length)
        return result

    }

    getAllMeetups(): Observable<IMeetup[]> {
        return this.http.get<IMeetup[]>(this.meetupsURL).pipe(
            tap((result: IMeetup[]) => {
                this.allMeetups = result;
                this.paginationService.total$.next(result.length)
            })
        );
    }

    getMyMeetups(): Observable<IMeetup[]> {
        return this.getAllMeetups().pipe(
            map((res: IMeetup[]) =>
                res.filter(item => item.owner.id === this.authService.user.id)
            ),
            tap(res => (this.myMeetups = res))
        );
    }

    subscribeToMeetup(idMeetup: number, idUser: number) {
        const body = {
            idMeetup,
            idUser,
        };
        return this.http.put(this.meetupsURL, body);
    }

    unsubscribeFromMeetup(idMeetup: number, idUser: number) {
        const body = {
            idMeetup,
            idUser,
        };
        return this.http.delete(this.meetupsURL, { body });
    }

    createMeetup(meetup: INewMeetup) {
        return this.http
            .post<INewMeetup>(this.meetupsURL, meetup)
            .pipe(tap(console.log));
    }

    deleteMeetup(id: number) {
        return this.http.delete(`${this.meetupsURL}/${id}`);
    }

    updateMeetup(id: number, newMeetup: INewMeetup) {
        return this.http.put(`${this.meetupsURL}/${id}`, newMeetup);
    }
}
