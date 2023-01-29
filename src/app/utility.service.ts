import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    public user?: Users;
    isNavOpen = true;

    setUser(user?: Users) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
    removeUser() {
        this.user = undefined;
    }

    constructor() { }
}