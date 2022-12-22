import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControlName, FormGroup } from '@angular/forms';
import { DropdownService } from 'src/app/services/dropdown.service';
import { IRole } from 'src/app/shared/models/role.interface';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
    constructor(public dropdownService: DropdownService) {}
    @Input() options: string[] = [];
    @Input() activeOption: string = '5';
    @Output() chooseOption = new EventEmitter<any>();
    @Input() disabled: boolean = true;
    isDropdownOpen: boolean = false;
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    onChooseHandler(value: any) {
        // this.dropdownService.selectedOption = value;
        // this.activeOption = value;
        // console.log(this.activeOption);
        this.toggleDropdown();
        this.activeOption = value;
        this.chooseOption.emit(value);
    }

    ngOnInit(): void {
        // this.activeOption = this.options[0];
    }
}
