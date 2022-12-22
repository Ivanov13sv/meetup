import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    constructor(
        public usersService: UsersService,
        public modalService: ModalService,
        private dropdownService: DropdownService,
        private userService: UsersService
    ) {}

    setOption(option: any) {
        console.log(option);
    }

    test() {
        console.log('test');
    }

    ngOnInit(): void {
        this.usersService
            .getUsers()
            .subscribe(res => (this.usersService.users = res));
        this.userService.getRoles().subscribe(res => {
            this.userService.roles = res.filter(item => item.length);
        });
    }
}
