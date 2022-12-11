import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class MeetupService {
    constructor(private authService: AuthService, private http: HttpClient) {}
    meetupsURL: string = `${environment.apiUrl}/meetup`; //how to corrent name paths like this

    private _allMeetups: any[] = [];

    getAllMeetups() {
        if (this.authService.token) {
            const user = this.authService.user;
            console.log(user)
            this.http
                .get(this.meetupsURL)
                .subscribe((res: any) => console.log(res));
        }
    }
}
