import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    constructor(public confirmService: ConfirmService) {}
    @Input() confirm() {}
    @Input() close(){}

    ngOnInit(): void {
        // console.log(this.confirmService.confirm$.getValue());
    }
}
