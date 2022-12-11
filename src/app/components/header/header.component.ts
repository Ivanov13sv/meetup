import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}

    public get isLoggedIn() {
        return this.authService.user;
    }

    public logout(){
        this.authService.logout()
    }

    public get isAdmin(){
        return this.authService.getRole() === 'ADMIN'
    }

}
