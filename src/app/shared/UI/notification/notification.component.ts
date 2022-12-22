import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { INotification } from 'src/app/shared/models/notification.interface';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
    constructor(public notificationService: NotificationService) {
       
    }

}
