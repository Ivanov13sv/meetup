import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, filter } from 'rxjs';
import { environment } from '../environments/environment';
import { IRole } from '../shared/models/role.interface';
import { IUser } from '../shared/models/user.interface';

export interface INewUser {
    email: string;
    password: string;
    fio: string;
}

export interface IUpdatingUser {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

    usersURL: string = `${environment.apiUrl}/user`;
    roleURL: string = `${environment.apiUrl}/role`;
    addRoleURL: string = `${environment.apiUrl}/user/role`;
    createUserUrl: string = `${environment.apiUrl}/auth/registration`;

    private users$ = new BehaviorSubject<IUser[]>([]);
    get users() {
        return this.users$.getValue();
    }
    set users(users: IUser[]) {
        this.users$.next(users);
    }

    roles$ = new BehaviorSubject<string[]>([]);

    set roles(roles: string[]) {
        this.roles$.next(roles);
    }
    get roles() {
        return this.roles$.getValue();
    }

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.usersURL);
    }

    getRoles(): Observable<string[]> {
        return this.http.get<IRole[]>(this.roleURL).pipe(
            map((roles: IRole[]) => {
                return roles.map(role => role.name);
            }),
            tap((res: string[]) => {
                return (this.roles = res);
            })
        );
    }

    createNewUser(newUser: INewUser) {
        console.log(newUser);
        return this.http
            .post(this.createUserUrl, newUser)
            .pipe(tap(console.log));
    }

    removeUser(id: number) {
        console.log(id);
        const url = `${this.usersURL}/${id}`;
        console.log(url);
        return this.http.delete(url).pipe(
            tap(() => {
                const filtredUsers = this.users$
                    .getValue()
                    .filter(item => item.id !== id);
                this.users$.next(filtredUsers);
            })
        );
    }

    chooseRole(id: number, role: string) {
        return this.http
            .post(this.addRoleURL, {
                names: [role],
                userId: id,
            })
            .subscribe();
    }

    updateUser(id: number, user: IUpdatingUser, role: string) {
        console.log(user);
        this.chooseRole(id, role);
        return this.http.put(`${this.usersURL}/${id}`, user);
    }
}
